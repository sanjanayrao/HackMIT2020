import React, { Component, useState, useEffect } from 'react';
import SearchBar from '../../SearchBar';
// import LocationSearchInput from '../../LocationSearchInput';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Map from '../../Map'
import CardsList from '../../CardsList'
import logo from '../../../assets/logo.png';
import ProgressCard from '../../ProgressCard'
import PieChart from '../../PieChart';
import BarChart from '../../BarChart';

// import LocationSearchInput from '../../LocationSearchInput';

const location = {
  address: 'Test text showing overlay stuff',
  lat: 37.42216,
  lng: -122.08427,
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 12,
    backgroundColor: "#FBFFFF"
  },
  title: {
    justify: 'left',
    marginBottom: 12,
  },
  media: {
    height: 66,
    width: 100
  }

}));

export default function Home(props) {
  const classes = useStyles();

  const [latLon, setLatLon] = useState({lat: "43.0731", lon: "89.4012"})
  const[airLoaded, setAirLoaded] = useState(false)
  const[airData, setAirData] = useState(null)
  const[zipcode, setZipcode] = useState("02114")
  const[demoLoaded, setDemoLoaded] = useState(false)
  const[demographics, setDemographics] = useState(false)
  const[radius, setRadius] = useState(1)

  useEffect(() => {
    console.log("requestingAir")
    setAirLoaded(false)
    fetch("http://localhost:8000/AirQuality?lat=".concat(latLon.lat, "&lon=", latLon.lon))
    .then(res => res.json())
    .then((result) => {
      console.log(result)
      setAirData(result)
      setAirLoaded(true)
    }, (error) => {
      console.log(error)
    })
  }, [latLon, props])

  useEffect(() => {
    console.log("requestingDemo")
    setDemoLoaded(false)
    fetch("http://localhost:8000/DemoInfo?zip=".concat(zipcode,"&rad=", radius))
    .then(res => res.json())
    .then((result) => {
      console.log(result)
      setDemographics(result)
      setDemoLoaded(true)
    }, (error) => {
      console.log(error)
    })
  }, [zipcode, props])

  const handleSubmit = (addressInput, radius) => {
    console.log(addressInput, radius)
     
    let zipcodeRegex = /^\s?\b(\d{5})(?:-\d{4})?$/;
    let coordinateRegex = /(\d{1,3}.\d{4}).*,\s?(\d{1,3}.\d{4})/;

    if(zipcodeRegex.test(addressInput)){
        var zipcode_match = addressInput.match(zipcodeRegex)
        setZipcode(zipcode_match[1])
        // TODO: get coordinates from zipcode
        setLatLon({lat: "50.3243", lon: "39.2321"})
    } else if(coordinateRegex.test(addressInput)){
        var coordinate_match = "50.3243,39.2321".match(coordinateRegex)
        setLatLon({lat: coordinate_match[1], lon: coordinate_match[2]})
        // TODO: get zip code from coordinates
        setZipcode(53072)
    } else {
        // TODO: get coordinates from addressInput
        setLatLon({lat: "50.3243", lon: "39.2321"})

        // TODO: get zip code from addressInput
        setZipcode(53072)
    }
    console.log("radius: " + parseInt(radius))
    setRadius(parseInt(radius))
  }
  return (
    <div className={classes.root}>
        {/* <LocationSearchInput/> */}
      <Grid container spacing={3}>
        <Grid item>
            <CardMedia
            className={classes.media}
            image={logo}
            title="Logo"
            />
        </Grid>
        <Grid item >
            <Typography variant="h2" className={classes.title}>
                Environscape
            </Typography>
        </Grid>
      </Grid>
        
        {/* <LocationSearchInput/> */}
        <Grid container spacing={3} justify="center" p={12}>
            <Grid item xs={12}>
                <SearchBar handleClick={handleSubmit}/>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={9}>
                <Grid container spacing={3} justify="center" p={12}>
                    <Grid item xs={12} sm={8}>
                        <Map location={location} zoomLevel={17}></Map>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {demoLoaded ? <CardsList pop={demographics.total_population} age={demographics.median_age} inc={demographics.median_income}/> : 
                        <><Skeleton variant="rect" height={110}/>
                        <Skeleton variant="rect" height={110}/>
                        <Skeleton variant="rect" height={110}/></>}
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Typography variant="h6">Race</Typography>
                        {/* <Skeleton variant="rect" height={256}/> */}
                        <BarChart demographics={demographics}/>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <Typography variant="h6">Education</Typography>
                        {/* <Skeleton variant="rect" height={256}/> */}
                        <PieChart demographics={demographics}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3}>
                <Paper style={{padding:12}} elevation={3} >
                  {/* <Typography variant="h6">Air Quality</Typography> */}
                  { airLoaded ? <ProgressCard title="Overall Air Quality" aqi={airData.baqi.aqi} health={airData.health} poll={airData.baqi.dominant_pollutant} source="" body={airData.baqi.category} col={airData.baqi.color} /> : <Skeleton variant="rect" height={100}/> }
                  {/* <Typography variant="h6">Carbon Monoxide</Typography> */}
                  { airLoaded ? <ProgressCard title="Carbon Monoxide" aqi={airData.pollutants.co.aqi} source={airData.pollutants.co.sources} effects={airData.pollutants.co.effects} col={airData.pollutants.co.color} />   : <Skeleton variant="rect" height={100}/> }
                  {/* <Typography variant="h6">Ozone</Typography> */}
                  { airLoaded ? <ProgressCard title="Ozone" aqi={airData.pollutants.o3.aqi} source={airData.pollutants.o3.sources} effects={airData.pollutants.o3.effects} col={airData.pollutants.o3.color} />   : <Skeleton variant="rect" height={100}/> }
                  {/* <Typography variant="h6">NO2</Typography> */}
                  { airLoaded ? <ProgressCard  title="Nitgrogen Dioxide" aqi={airData.pollutants.no2.aqi} source={airData.pollutants.no2.sources} effects={airData.pollutants.no2.effects} col={airData.pollutants.no2.color} />   : <Skeleton variant="rect" height={100}/> }
                  {/* <Typography variant="h6">PM10</Typography> */}
                  { airLoaded ? <ProgressCard  title="PM10" aqi={airData.pollutants.pm10.aqi} source={airData.pollutants.pm10.sources} effects={airData.pollutants.pm10.effects} col={airData.pollutants.pm10.color} />   : <Skeleton variant="rect" height={100}/> }
                  {/* <Typography variant="h6">PM2.5</Typography> */}
                  { airLoaded ? <ProgressCard  title="PM25" aqi={airData.pollutants.pm25.aqi} source={airData.pollutants.pm25.sources} effects={airData.pollutants.pm25.effects} col={airData.pollutants.pm25.color} />  : <Skeleton variant="rect" height={100}/> }
              </Paper>
            </Grid>
            <Grid item xs={12}>
                <p>Design and built for HackMIT 2020 Urban Innovation track by Annika Wille, Brad Hodkinson, Matt Wildman, and Sanjana Rao</p>
            </Grid>
        </Grid>
    </div>
  );
}