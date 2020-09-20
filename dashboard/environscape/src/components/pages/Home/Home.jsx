import React, { Component } from 'react';
import SearchBar from '../../SearchBar';
// import LocationSearchInput from '../../LocationSearchInput';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import CardMedia from '@material-ui/core/CardMedia';
import Map from '../../Map'
import CardsList from '../../CardsList'
import logo from '../../../assets/logo.png';

 
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

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item>
            <CardMedia
            className={classes.media}
            image={logo}
            title="Logo"
            />
        </Grid>
        <Grid item >
            <Typography variant="h2" className={classes.title} justify="left">
                Environscape
            </Typography>
        </Grid>
      </Grid>
        
        {/* <LocationSearchInput/> */}
        <Grid container spacing={3} justify="center" p={12}>
            <Grid item xs={12}>
                <SearchBar/>
            </Grid>
            <Grid item xs={12} sm={4}>
                 <Map location={location} zoomLevel={17}></Map>
                <Typography variant="h6">Race Breakdown Bar Chart</Typography>
                <Skeleton variant="rect" height={256}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <CardsList/>
              <Typography variant="h6">Education Pie Chart</Typography>
              <Skeleton variant="rect" height={256}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Typography variant="h6">Air Quality</Typography>
                <Skeleton variant="rect" height={256}/>
                <Typography variant="h6">Carbon Monoxide</Typography>
                <Skeleton animation="wave" height={28}/>
                <Typography variant="h6">Ozone</Typography>
                <Skeleton animation="wave" height={28}/>
                <Typography variant="h6">NO2</Typography>
                <Skeleton animation="wave" height={28}/>
                <Typography variant="h6">PM10</Typography>
                <Skeleton animation="wave" height={28}/>
                <Typography variant="h6">PM2.5</Typography>
                <Skeleton animation="wave" height={28}/>
            </Grid>
        </Grid>
    </div>
  );
}