import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import {buildMap} from "./maphelp";

const MapRow = styled.div`
  text-align: center;
  height: 500px;
  width: 500px;
`;

const MapViewer = ({onClick, defaultLocation}) => {
    const mapElement = useRef(null);
    console.log(onClick)
    console.log(defaultLocation)
    useEffect(() => {
        console.log('Effect map')
        //if (mapElement.current) return
        const initializeMap = (coords) => {
            buildMap(coords, mapElement, onClick);
        };

        if (defaultLocation) {
            initializeMap([defaultLocation.longitude, defaultLocation.latitude]);
        } else {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    initializeMap([pos.coords.longitude, pos.coords.latitude]);
                },
                (e) => {
                },
                {enableHighAccuracy: true}
            );
        }
    }, [/*mapElement, defaultLocation, onClick*/]);

    return <MapRow ref={mapElement} className="map-container"/>;
};

export default MapViewer;
