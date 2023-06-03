//import {LocationType} from "../../../state/types";

import {setGeolocation} from "../../state/geolocation.slice";
import {useDispatch} from "react-redux";

//const dispatch = useDispatch()
export const getLocationQuery = (callback) => {
    navigator.geolocation.getCurrentPosition(
        pos => {
            callback(pos.coords);
        },
        e => {//перевірити що повертає
            callback({
                latitude: 50.44989086706778, longitude: 30.524897236099616, error: true
            });
        },
        {enableHighAccuracy: true},
    );
}

export const getDataKey = (location) =>
    location.cityName !== '' ? `${location?.cityName}` : `${location?.latitude},${location?.longitude}`;