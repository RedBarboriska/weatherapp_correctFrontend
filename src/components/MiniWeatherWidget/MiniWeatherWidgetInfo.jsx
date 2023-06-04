
import "./miniWeatherWidget.css"
import {
    fetchCurrentWeatherAsync,
    isLoadingSelector,
    weatherDataSelector,
    weatherErrorSelector
} from "../../state/weather.slice";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from 'react';
import AddOrRemove from "../AddOrRemove";
import {changeCityname, changeCoords} from "../../state/location.slice";
import {getDataKey} from "../WeatherWidget/weatherWidget.helpers";

const MiniWeatherWidgetInfo = (city) => {
    const dispatch=useDispatch()
    console.log("isSelected")
    console.log(city.isSelected)
    //console.log(city)
    //console.log(city.city)
    const [location, setLocation] = useState({cityName:"",latitude:city.city.latitude, longitude:city.city.longitude})
    //const [location, setLocation] = useState(`${city.city.latitude},${city.city.longitude}`)
    const [isSearchByName, setIsSearchByName] = useState(false)
    //const location = `${city.city.latitude},${city.city.longitude}`


    const locationName=city.city.cityName
    //dispatch(fetchCurrentWeatherAsync({q: `${city.city.latitude},${city.city.longitude}`}))
    const weatherData = useSelector(state => weatherDataSelector(state, getDataKey(location), shallowEqual))
    const isLoading = useSelector(state => isLoadingSelector(state, getDataKey(location)), shallowEqual)
    const error = useSelector(state => weatherErrorSelector(state, getDataKey(location)), shallowEqual)
    if(weatherData && weatherData.location.name!==city.city.cityName && location!==city.city.cityName){
        console.log("INSIDE")
        console.log(weatherData.location.name)
        console.log(city.city.cityName)
        console.log(location)
        setIsSearchByName(true)
        //setLocation(`${city.city.cityName}`)
        setLocation({cityName:"",latitude:"", longitude:city.city.cityName})
    }
    console.log("WEATHER DATA")
    console.log(weatherData)
    useEffect(() => {
        dispatch(fetchCurrentWeatherAsync({q: getDataKey(location)}))

    },[location])

    return (<>

        {/*//віджет {city.city.cityName}*/}
        {!isLoading && weatherData && !error &&


        <div className="miniWeatherWidget"
             style={{ backgroundColor: city.isSelected ? "#87b4f3" : "#E2F1FD" }}
             onClick={()=>{
                 if(isSearchByName){
                     console.log("CITY NAME")
                     console.log(city.city.cityName)
                     dispatch(changeCityname(city.city.cityName))
                     //dispatch(fetchCurrentWeatherAsync({q: `${city.city.cityName}`}))
                 }else {
                     console.log("COORDS")
                     //dispatch(fetchCurrentWeatherAsync({q: `${city.city.latitude},${city.city.longitude}`}))
                     dispatch(changeCoords({latitude: city.city.latitude, longitude: city.city.longitude}))
                 }
             }

        }

        >
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
        }
    </>)

}

export default MiniWeatherWidgetInfo