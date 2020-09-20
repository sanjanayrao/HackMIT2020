import React from 'react'
import GoogleMapReact from 'google-map-react'
import './styles/map.css'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import { Icon } from '@material-ui/core'

const Map = ({ location, zoomLevel }) => (
    <div className="google-map">
        <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyDi_qW8MUJvzAVHNjfyHYWlATJtMRZXMdw' }}
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
)



const LocationPin = ({ text }) => (
    <div className="pin">
        <Icon icon={LocationOnIcon} className="pin-icon" />
        <p className="pin-text">{text}</p>
    </div>
)

export default Map