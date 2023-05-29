import React, {useEffect, useState} from 'react';
import WeatherWidget from "../WeatherWidget/WeatherWidget";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {
    fetchCurrentWeatherAsync,
    isLoadingSelector,
    weatherDataSelector,
    weatherErrorSelector
} from "../state/weather.slice";
import {getDataKey} from "../WeatherWidget/weatherWidget.helpers";
import MiniWeatherWidgetInfo from "./MiniWeatherWidgetInfo";
//дістає дані про міста в дашборді??? - ✔
//запускає цикл по цим містам і виводить кожне (а як їхню погоду знайти???) \(Т-Т)/ на location теж поставити список як weather?
//якщо геолокація(місто в головному віджеті) і місто в дашборді співпадають, то його не виводять
//onClick - відкривається MainWidget
//
//
const MiniWeatherWidget = (onClick) => {

    const weatherData = useSelector(state => weatherDataSelector(state, getDataKey(location)), shallowEqual)
    const isLoading = useSelector(state => isLoadingSelector(state, getDataKey(location)), shallowEqual)
    const error = useSelector(state => weatherErrorSelector(state, getDataKey(location)), shallowEqual)
    const user = useSelector((state) => state.user)
    const geolocation = useSelector((state) => state.geolocation)
    const [nextId, setNextId] = useState(1)
    const [widgets, setWidgets] = useState([{id: nextId}])
    const dispatch = useDispatch()
    const data = user.dashboardInfo.map((city) => ({
        latitude: city.latitude,
        longitude: city.longitude,
    }));

    return (<>
        {user.dashboardInfo.map((city) => {
            setNextId(nextId + 1);
            setWidgets([...widgets, {id: nextId + 1}]);
            {
                widgets.map(({id}) => {
                    return <MiniWeatherWidgetInfo key={id}
                                                  data={dispatch(fetchCurrentWeatherAsync({q: `${city.latitude},${city.longitude}`}))}/>
                    //fetchCurrentWeatherAsync міняє везер, а як той везер дістати
                })
            }
            ;
        })}

    </>)
}

export default MiniWeatherWidget