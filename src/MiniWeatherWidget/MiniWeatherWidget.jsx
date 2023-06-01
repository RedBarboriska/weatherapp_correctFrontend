import React, {useEffect, useState} from 'react';
//import WeatherWidget from "../WeatherWidget/WeatherWidget";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {
    fetchCurrentWeatherAsync,
    isLoadingSelector,
    weatherDataSelector,
    weatherErrorSelector
} from "../state/weather.slice";
import {getDataKey} from "../WeatherWidget/weatherWidget.helpers";
import MiniWeatherWidgetInfo from "./MiniWeatherWidgetInfo";
import styled from "styled-components";
import {changeCoords} from "../state/location.slice";
//дістає дані про міста в дашборді??? - ✔
//запускає цикл по цим містам і виводить кожне (а як їхню погоду знайти???) \(Т-Т)/ на location теж поставити список як weather?
//якщо геолокація(місто в головному віджеті) і місто в дашборді співпадають, то його не виводять
//onClick - відкривається MainWidget
//
//

const MiniWeatherWidgetWrapper = styled.div`
  width: 100%;
  //background-color: #E2F1FD;
  display: flex;
  flex-direction: row;
  text-align: left;
  //padding-left: 10px;
  //padding-bottom: 5px;
  

`

const MiniWeatherWidget = (onClick) => {

    const user = useSelector((state) => state.user)
    const geolocation = useSelector((state) => state.geolocation)
    const [nextId, setNextId] = useState(1)
    const [widgets, setWidgets] = useState([{id: nextId}])
    const dispatch = useDispatch()
    const data = user.dashboardInfo.map((city) => ({
        latitude: city.latitude,
        longitude: city.longitude,
    }));
    const searchedCity = useSelector((state) => state.searchedCity)


    //`${location?.latitude},${location?.longitude}`
    //const weatherData = useSelector(state => weatherDataSelector(state, getDataKey(location)), shallowEqual)
    //const isLoading = useSelector(state => isLoadingSelector(state, getDataKey(location)), shallowEqual)
    //const error = useSelector(state => weatherErrorSelector(state, getDataKey(location)), shallowEqual)

    return (<>

        <MiniWeatherWidgetWrapper>
            {user.dashboardInfo
                 .filter(city =>
                         !(city.cityName === searchedCity.cityName &&
                         city.cityRegion === searchedCity.cityRegion &&
                         city.cityCountry === searchedCity.cityCountry)
                      )
                .map((city, index) => {
               // const city = item;
                   // console.log("CITY")
                   // console.log(index)
                   // console.log(city)
                   // console.log(city.city)

                console.log(city)
                return (

                    <MiniWeatherWidgetInfo
                        key={`${city.cityName}${city.latitude}${city.longitude}`}
                        city={city}

                    />

                );
            })}
        </MiniWeatherWidgetWrapper>



    </>)
}

export default MiniWeatherWidget


/*
                        //data={
                        //dispatch(fetchCurrentWeatherAsync({ q: `${city.latitude},${city.longitude}`}))
                          //  useSelector(state => weatherDataSelector(state, `${city.latitude},${city.longitude}`), shallowEqual)
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

 */