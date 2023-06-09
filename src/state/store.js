import weather from './weather.slice';
import location from './location.slice';
import user from './user.slice';
import geolocation from "./geolocation.slice";
import forecastParams from "./forecastParams.slice";
import {configureStore} from "@reduxjs/toolkit";
import searchedCity from "./searchedCity.slice";
import weatherMap from "./weatherMap.slice"
export const store = configureStore({
    reducer: {
        weather,
        location,
        user,
        geolocation,
        forecastParams,
        searchedCity,
        weatherMap
    },
    middleware: getDefaultMiddleware => {
        const defaultMiddleware = getDefaultMiddleware({
            serializableCheck: false,
        });
        return defaultMiddleware
    }
});