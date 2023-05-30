//import {LocationType} from "../../../state/types";

import {setGeolocation} from "../state/geolocation.slice";
import {useDispatch} from "react-redux";

//const dispatch = useDispatch()
export const getLocationQuery = (callback) => {
    navigator.geolocation.getCurrentPosition(
        pos => {
           // dispatch(setGeolocation(pos.coords))
            callback(pos.coords);
        },
        e => {//перевірити що повертає
            callback({
                latitude: 51.6938446, longitude: -0.1774186, error: true
            });
        },
        {enableHighAccuracy: true},
    );
}

export const getDataKey = (location) =>
    location.cityName !== '' ? `${location?.cityName}` : `${location?.latitude},${location?.longitude}`;