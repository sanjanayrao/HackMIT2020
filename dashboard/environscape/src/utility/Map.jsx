import React from 'react'
import GoogleMapReact from 'google-map-react'
import './map.css'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import { Icon } from '@material-ui/core'

const Map = ({ location, zoomLevel }) => (
    <div className="map">
        <h2 className="map-h2">Come Visit Us At Our Campus</h2>

        <div className="google-map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyAZJeAuNFC8L1RWxNtq0HCCGTWM43HjFMQ' }}
                defaultCenter={location}
                defaultZoom={zoomLevel}
            >
                <LocationPin
                    lat={location.lat}
                    lng={location.lng}
                    text={location.address}
                />
            </GoogleMapReact>
        </div>
    </div>
)



const LocationPin = ({ text }) => (
    <div className="pin">
        <Icon icon={LocationOnIcon} className="pin-icon" />
        <p className="pin-text">{text}</p>
    </div>
)

export default Map