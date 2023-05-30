import React, {useEffect, useState} from 'react';
import {
    fetchCurrentWeatherAsync,
    isLoadingSelector,
    weatherDataSelector,
    weatherErrorSelector
} from '../state/weather.slice';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
// @ts-ignore
import {getDataKey, getLocationQuery} from "./weatherWidget.helpers";
import WeatherInfoMain from "./WeatherInfoMain";
import {changeCoords} from "../state/location.slice";



const WidgetWrapper = styled.div`
//придумати якісь стилі
`

const WeatherWidget = () => {
    const dispatch = useDispatch()
    const location = useSelector((state) => state.location)
    //const [location, setLocation] = useState(null);
    const [modalVisible, setModalVisible] = useState(false)
    const [geolocationError, setGeolocationError] = useState(false)

    const weatherData = useSelector(state => weatherDataSelector(state, getDataKey(location)), shallowEqual)
    const isLoading = useSelector(state => isLoadingSelector(state, getDataKey(location)), shallowEqual)
    const error = useSelector(state => weatherErrorSelector(state, getDataKey(location)), shallowEqual)
    //const geolocationError = useSelector(state => weatherErrorSelector(state, getDataKey(location)), shallowEqual)
console.log(weatherData, location)

    useEffect(() => {
        const fetchLocation = () => {
            if (location.latitude !== "" && location.longitude !== "") {
                console.log(location)
                console.log(location.latitude)
                console.log(location.longitude)
                    dispatch(fetchCurrentWeatherAsync({q: `${location.latitude},${location.longitude}`}))
            } else if(location.cityName !== ""){
                console.log(location)
                console.log(location.cityName)
                    dispatch(fetchCurrentWeatherAsync({q: `${location.cityName}`}))
            }
            else {
                getLocationQuery(q => {
                    //перевірити що повертає
                    dispatch(changeCoords({latitude: q.latitude, longitude: q.longitude}))
                    console.log(location)
                    if (error) {
                        setGeolocationError(true)
                    }

                })
            }
        }
        fetchLocation()
        const id = setInterval(fetchLocation, 300000)

        return () => {
            clearInterval(id)
        }
    }, [location, dispatch]);

    return (<>
            <WidgetWrapper
                /*onClick={() => {
                    setModalVisible(true)
                }}*/>

                {!isLoading && !error && !geolocationError && weatherData && !weatherData?.error?.message &&
                    <>
                       {/* {console.log(weatherData)}*/}
                        <WeatherInfoMain weatherData={weatherData}/>
                    </>
                }
                {weatherData?.error?.message && <p>Помилка... {weatherData?.error?.message}</p>}
                {isLoading && <p>Завантаження... </p>}
                {geolocationError &&
                    <p>Дозвольте доступ до Вашого місцезнаходження, щоб отримати прогноз погоди у Вашому місті</p>}
                {error && <div>За вашим запитом нічого не знайдено</div>}
            </WidgetWrapper>
            {/*{modalVisible &&*/}
            {/*    ReactDOM.createPortal(<MapModal defaultLocation={location} onClose={(data) => {*/}
            {/*        setLocation(data)*/}
            {/*        setModalVisible(false)*/}
            {/*    }}/>, document.body)}*/}
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