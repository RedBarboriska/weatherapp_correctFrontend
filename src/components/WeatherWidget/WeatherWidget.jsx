import React, {useEffect, useState} from 'react';
import {
    fetchCurrentWeatherAsync,
    isLoadingSelector,
    weatherDataSelector,
    weatherErrorSelector
} from '../../state/weather.slice';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
// @ts-ignore
import {getDataKey, getLocationQuery} from "./weatherWidget.helpers";
import WeatherInfoMain from "./WeatherInfoMain";
import {changeCoords} from "../../state/location.slice";
import {setGeolocation} from "../../state/geolocation.slice";
import {setSearchedCity} from "../../state/searchedCity.slice";
import LoadingSpinner from "../LoadingSpinner";
import {Skeleton} from "antd";



const WidgetWrapper = styled.div`
//придумати якісь стилі
`

const WeatherWidget = () => {
    const dispatch = useDispatch()
    const location = useSelector((state) => state.location)

    //const [location, setLocation] = useState(null);
    const [modalVisible, setModalVisible] = useState(false)
    const [geolocationError, setGeolocationError] = useState(false)

    const weatherData = useSelector(state => weatherDataSelector(state), shallowEqual)
    const isLoading = useSelector(state => isLoadingSelector(state), shallowEqual)
    const error = useSelector(state => weatherErrorSelector(state), shallowEqual)
    console.log(weatherData)
    //const user = useSelector((state) => state.user)
    //const geolocationError = useSelector(state => weatherErrorSelector(state, getDataKey(location)), shallowEqual)
console.log(weatherData, location)
    console.log(error)
    if (weatherData.location && !weatherData?.error?.message){
    dispatch(setSearchedCity(
        {cityName: weatherData.location.name,
            cityRegion:weatherData.location.region,
            cityCountry: weatherData.location.country }))}

    useEffect(() => {
        const fetchLocation = () => {
            //видалити попереднє значення
            if (location.latitude !== "" && location.longitude !== "") {
                    dispatch(fetchCurrentWeatherAsync({q: `${location.latitude},${location.longitude}`}))
            } else if(location.cityName !== ""){
                    dispatch(fetchCurrentWeatherAsync({q: `${location.cityName}`}))
            }
            else {
                getLocationQuery(q => {
                    dispatch(changeCoords({latitude: q.latitude, longitude: q.longitude}))
                    console.log(location)
                    if (!q.error) {
                        console.log(q)
                        dispatch(setGeolocation({latitude: q.latitude, longitude: q.longitude}))
                    }else{
                        console.log(q)
                        setGeolocationError(true)
                        console.log(geolocationError)
                    }

                })
            }
        }
        fetchLocation()
        const id = setInterval(fetchLocation, 300000)
        /*dispatch(setSearchedCity(
            {cityName: weatherData?.location.name,
                cityRegion:weatherData?.location.region,
                cityCountry: weatherData?.location.country }))*/

        return () => {
            clearInterval(id)
        }
    }, [location, dispatch]);

    return (<>

                {geolocationError &&
                    <p>Дозвольте доступ до Вашого місцезнаходження, щоб отримати прогноз погоди у Вашому місті</p>}

                {!isLoading  && weatherData && !weatherData?.error?.message &&
                    <>

                        <WeatherInfoMain weatherData={weatherData}/>

                    </>
                }
                {weatherData?.error?.message && <p>Помилка... {weatherData?.error?.message}</p>}
                {isLoading && <p>Завантаження...<LoadingSpinner/> </p>}


        </>
    );

}

export default WeatherWidget

/*
{isLoading && <>
                {geoError && "Дозвольте доступ до Вашого місцезнаходження, щоб отримати прогноз погоди у Вашому місті"}
                {!geoError && <p>Завантаження... </p>}
            </>}
            {!isLoading && searchError && <>
                <div>За вашим запитом нічого не знайдено</div>
            </>}

*/

/*


 */