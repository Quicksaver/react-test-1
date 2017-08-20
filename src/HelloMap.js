import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import './HelloMap.css';

class HelloMap extends Component {
    render() {
        let position = [51.505, -0.09];
        let zoom = 13;
        return (
            <div className="HelloMap">
                <Map center={position} zoom={zoom}>
                    <TileLayer
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position}>
                        <Popup>
                            <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
                        </Popup>
                    </Marker>
                </Map>
            </div>
        );
    }
}

export default HelloMap;
