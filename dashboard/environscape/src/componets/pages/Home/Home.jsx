import React, { Component } from 'react';
import MapSection from '../../../utility/Map'
import Cards from '../../../utility/Cards'
import CardsList from '../../../utility/CardsList'

const location = {
    address: 'asdfasdfasdfasdfasdfasdfasdfas dasf asdf asdf asd f.',
    lat: 37.42216,
    lng: -122.08427,
}

class Home extends Component {
    render() {
        return (
            <div>
                <div>
                    <h1>Home</h1>
                    <MapSection location={location} zoomLevel={17} />
                </div>

                <div className="cards">
                    <CardsList></CardsList>
                </div>
            </div>


        );
    }
}


// // AIzaSyAZJeAuNFC8L1RWxNtq0HCCGTWM43HjFMQ
// <script
//    async defer src="https://maps.googleapis.com/maps/api/js?key={YOUR API KEY}
//    callback=initMap&libraries=drawing"
//    type="text/javascript">
// </script>
export default Home;