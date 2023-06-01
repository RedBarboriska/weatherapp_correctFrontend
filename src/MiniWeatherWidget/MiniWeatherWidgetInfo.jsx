
import "./miniWeatherWidget.css"
import {
    fetchCurrentWeatherAsync,
    isLoadingSelector,
    weatherDataSelector,
    weatherErrorSelector
} from "../state/weather.slice";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from 'react';
import AddOrRemove from "../WeatherWidget/AddOrRemove";

const MiniWeatherWidgetInfo = (city) => {
    const dispatch=useDispatch()
    //console.log(city)
    //console.log(city.city)
    const [location, setLocation] = useState(`${city.city.latitude},${city.city.longitude}`)

    //const location = `${city.city.latitude},${city.city.longitude}`


    const locationName=city.city.cityName
    //dispatch(fetchCurrentWeatherAsync({q: `${city.city.latitude},${city.city.longitude}`}))
    const weatherData = useSelector(state => weatherDataSelector(state, location, shallowEqual))
    const isLoading = useSelector(state => isLoadingSelector(state, location), shallowEqual)
    const error = useSelector(state => weatherErrorSelector(state, location), shallowEqual)
    if(weatherData && weatherData.location.name!==city.city.cityName && location!==city.city.cityName){
        console.log("INSIDE")
        console.log(weatherData.location.name)
        console.log(city.city.cityName)
        console.log(location)

        setLocation(`${city.city.cityName}`)
    }
    console.log("WEATHER DATA")
    console.log(weatherData)
    useEffect(() => {
        dispatch(fetchCurrentWeatherAsync({q: location}))

    },[location])

    return (<>

        {/*//віджет {city.city.cityName}*/}
        {!isLoading && weatherData && !error &&
        <>
        <div className="miniWeatherWidget">
            <AddOrRemove weatherData={weatherData} />
            <div className="cityName">{weatherData?.location.name}</div>
            <div className="regionName">{weatherData?.location?.region}</div>
            <div className="regionName">{weatherData?.location?.country}</div>
            <div className="mainInfo">
                <div><img src={`https:${weatherData.current?.condition.icon}`}/></div>
                <div className="temperature">{weatherData?.current?.temp_c}°C</div>
            </div>
            <div className="minmax">
                <div className="minmaxNames">
                    <div>мін</div>
                    <div>макс</div>
                </div>
                <div className="minmaxTemp">
                    <div>{weatherData?.forecast?.forecastday[0].day.mintemp_c}°</div>
                    <div>{weatherData?.forecast?.forecastday[0].day.maxtemp_c}°</div>
                </div>
            </div>

        </div>
        </>}
    </>)

}

export default MiniWeatherWidgetInfo