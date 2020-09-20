import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import './styles/map.css'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import { Icon } from '@material-ui/core'


class Map extends Component{
    constructor(props) {
        super(props);
        this.MIT_CENTER = {
            lat: 42.3601,
            lng: 71.0942
        }
        this.state = {
          loc: {
            address: "MIT",
            lat: 42.3601,
            lng: 71.0942
            },
          zoomLevel: 7
        }
      }
    componentDidMount(){
        this.setState({
            loc: this.props.location,
            zoom : this.props.location.zoomLevel
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.updateAndNotify();
        }
    }
    updateAndNotify() {
        this.setState({
            loc: this.props.location,
            zoom : this.props.location.zoomLevel
        })
    }
   
    render(){
        var MIT_CENTER = {
            lat: 42.3601,
            lng: -71.0942
        }
        return (
            <div className="google-map">
                    <GoogleMapReact
                        // bootstrapURLKeys={{ key: 'AIzaSyDwSugaTGfsFQhRY-bACgkKAfmBWZGQcJE' }}
                        bootstrapURLKeys={{ key: 'AIzaSyClGaEaDqGfLneyxUQIj4tZ0W7mVovu7NI' }}
                        center={MIT_CENTER}
                        defaultCenter={MIT_CENTER}
                        defaultZoom={11}
                    >
                        {/* <LocationPin
                            lat={this.state.lat}
                            lng={this.state.lng}
                            text={this.state.text}
                        /> */}
                    </GoogleMapReact>
                </div>
        );
    }
    
}


// const LocationPin = ({ text }) => (
//     <div className="pin">
//         <Icon icon={LocationOnIcon} className="pin-icon" />
//         <p className="pin-text">{text}</p>
//     </div>
// )

export default Map