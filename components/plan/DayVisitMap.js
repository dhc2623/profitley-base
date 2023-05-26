import React, { useRef, useEffect, useState } from 'react';
import Head from 'next/head';
// import 'mapbox-gl/dist/mapbox-gl.css';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import {MapboxDirections} from '@mapbox/mapbox-gl-directions'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'


// import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'

mapboxgl.accessToken = 'pk.eyJ1IjoibW9oYW1tZWQtcG9vbHdhbGEiLCJhIjoiY2tuaWU4emM0MHY5bzJ1bDc0MGhsenBybCJ9.VFeaHU4MeFSo5iGYaK3nvQ';

const DayVisitMap = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        var bounds = new mapboxgl.LngLatBounds();

        let mapXX = map.current
        var directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            unit: 'metric',
            profile: 'mapbox/driving',
            interactive: false,
            controls: false
        });
        mapXX = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            // center: [3.1026, 36.6686],
            //center: [this.state.lng, this.state.lat],
            zoom: 10
        });
        mapXX.on('load', () => {
            directions.setOrigin([-117.1425, 32.63638889]);
            // directions.addWaypoint(0, [-117.1425, 32.63638889]);
            directions.addWaypoint(1, [-117.195, 32.75416667]);
            // directions.addWaypoint(3, [-116.5012667, 32.92583333]);
            directions.setDestination([-116.5012667, 32.92583333]);

            // Create a default Marker and add it to the map.
            var marker1 = new mapboxgl.Marker()
                .setLngLat([-117.1425, 32.63638889])
                .addTo(mapXX);

            var marker3 = new mapboxgl.Marker()
                .setLngLat([-116.5012667, 32.92583333])
                .addTo(mapXX);

            // Create a default Marker, colored black, rotated 45 degrees.
            var marker2 = new mapboxgl.Marker({ color: 'black', rotation: 45 })
                .setLngLat([-117.195, 32.75416667])
                .addTo(mapXX);
        })
        mapXX.addControl(directions, 'top-left');
        mapXX.fitBounds(bounds, {padding: 100})

    }, []);

    return (
        <div>
            <Head>
                {/* <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.0/mapbox-gl-directions.js"></script> */}
                <link href='https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css' rel='stylesheet' />
                <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.0/mapbox-gl-directions.css" type="text/css" />
            </Head>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div className="map-container" ref={mapContainer} style={{ height: '400px', width: '100vw' }} />
        </div>
    );
};

export default DayVisitMap;