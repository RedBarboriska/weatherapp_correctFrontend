import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import {fromLonLat, transform} from "ol/proj";
import {Vector} from "ol/layer";
import {Vector as SVector} from "ol/source";
import {Circle} from "ol/geom";
import {Fill, Stroke, Style} from "ol/style";
import {Feature, Map as OlMap, View} from "ol";

export let initialMap = null;
export const setInitialMap = (map) => {
    initialMap = map;
}
// Defining the buildMap function
export const buildMap = (coords, mapElement, onClick) => {
    let prevLayer = null;
    console.log('build map')
    // Creating the initial map
    if (initialMap) return
    initialMap = new OlMap({
        target: mapElement.current,
        layers: [
            new TileLayer({source: new OSM()})
        ],
        controls: [],
        view: new View({center: [0, 0], zoom: 1})
    });

// Setting the initial view of the map
    initialMap.getView().setCenter(transform(coords, 'EPSG:4326', 'EPSG:3857'));
    initialMap.getView().setZoom(12);

// Defining the drawMarker function
    const drawMarker = (lonlat) => {
        const centerLongitudeLatitude = fromLonLat(lonlat);

        const layer = new Vector({
            source: new SVector({
                projection: 'EPSG:4326',
                features: [new Feature(new Circle(centerLongitudeLatitude, 400))]
            }),
            style: [
                new Style({
                    stroke: new Stroke({
                        color: 'blue',
                        width: 3
                    }),
                    fill: new Fill({
                        color: 'rgba(33,141,255,0.3)'
                    })
                })
            ]
        });
        initialMap.addLayer(layer);
        if (prevLayer) {
            initialMap.removeLayer(prevLayer);
        }
        prevLayer = layer;
    };
    drawMarker(coords);

// Adding a click event to the map
    initialMap.on('click', (event) => {
        const lonlat = transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
        const longitude = lonlat[0];
        const latitude = lonlat[1];
        onClick({latitude, longitude});
        drawMarker(lonlat);
    });

    return initialMap;
}