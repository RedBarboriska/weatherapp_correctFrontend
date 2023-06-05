
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
import {
    fetchMapWeatherAsync,
    isLoadingMapSelector, removeByKey,
    weatherDataMapSelector,
    weatherErrorMapSelector
} from "../../state/weatherMap.slice";

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

const key =`${city.city.latitude},${city.city.longitude},${city.city.cityName}`
    console.log(key)
    console.log("key")
    const locationName=city.city.cityName
    //dispatch(fetchCurrentWeatherAsync({q: `${city.city.latitude},${city.city.longitude}`}))
    const weatherData = useSelector(state => weatherDataMapSelector(state, key), shallowEqual)
    const isLoading = useSelector(state => isLoadingMapSelector(state, key), shallowEqual)
    const error = useSelector(state => weatherErrorMapSelector(state, key), shallowEqual)
    console.log(weatherData)
    if(weatherData && weatherData.location?.name!==city.city.cityName && location.cityName!==city.city.cityName){
        console.log("INSIDE")
        console.log(weatherData)
        console.log(city.city.cityName)
        console.log(location)
        setIsSearchByName(true)
        setLocation({longitude:"",latitude:"", cityName:city.city.cityName})
        console.log(`${weatherData.location.lat},${weatherData.location.lon}`)
        //dispatch(removeByKey(`${weatherData.location.lat},${weatherData.location.lon}`))
    }
    console.log("WEATHER DATA")
    //console.log("PLEASE")
    console.log(weatherData)
    console.log(isLoading)
    useEffect(() => {
        const fetchLocation=()=>{
        console.log("FETCH")
            console.log(location)
            console.log(getDataKey(location))
        dispatch(fetchMapWeatherAsync({q: getDataKey(location),key:key}))}
        fetchLocation()
        const id = setInterval(fetchLocation, 300000)
        /*dispatch(setSearchedCity(
            {cityName: weatherData?.location.name,
                cityRegion:weatherData?.location.region,
                cityCountry: weatherData?.location.country }))*/

        return () => {
            clearInterval(id)
        }

    },[location])

    return (<>

        {/*//віджет {city.city.cityName}*/}
        {!isLoading && weatherData && !weatherData?.error?.message &&


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


            <div className={"head"}>
                <div >
                    <div className={"cityName"}>{weatherData?.location?.name}</div>
                    <div className={"regionName"}>{weatherData?.location?.region},{weatherData?.location?.country}</div>
                </div>
                <div className={"addOrRemove"}><AddOrRemove weatherData={weatherData} width={"20px"}/></div>

            </div>
            <div  className={"weatherInfo"}>
                <div className={"temperature"}>{String(weatherData?.current?.temp_c).split(".")[0]}°</div>
                <div  className={"minmax"}>
                    <div>{String(weatherData?.forecast?.forecastday[0]?.day.maxtemp_c).split(".")[0]}°</div>
                    <div>{String(weatherData?.forecast?.forecastday[0]?.day.mintemp_c).split(".")[0]}°</div>
                </div>
                <img className={"imgDIV"} src={`https:${weatherData?.current?.condition?.icon}`}/>
            </div>


          {/*  <div>
                <div className={"cityName"}>{weatherData?.location.name}</div>
                <div className={"regionName"}>{weatherData?.location?.region},{weatherData?.location?.country}</div>
            </div>
            <div className={"temperature"}>{weatherData?.current?.temp_c}°</div>
            <div className={"minmax"}>
                <div>{weatherData?.forecast?.forecastday[0].day.maxtemp_c}°</div>
                <div>{weatherData?.forecast?.forecastday[0].day.mintemp_c}°</div>
            </div>
            <img className={"imgDIV"} src={`https:${weatherData.current?.condition.icon}`}/>
            <div><AddOrRemove weatherData={weatherData} /></div>
*/}

        </div>
        }
    </>)

}

export default MiniWeatherWidgetInfo

/*

<div>
                <div className={"cityName"}>{weatherData?.location.name}</div>
                <div className={"regionName"}>{weatherData?.location?.region},{weatherData?.location?.country}</div>
            </div>
            <div className={"temperature"}>{weatherData?.current?.temp_c}°</div>
            <div className={"minmax"}>
                <div>{weatherData?.forecast?.forecastday[0].day.maxtemp_c}°</div>
                <div>{weatherData?.forecast?.forecastday[0].day.mintemp_c}°</div>
            </div>
            <img className={"imgDIV"} src={`https:${weatherData.current?.condition.icon}`}/>
            <div><AddOrRemove weatherData={weatherData} /></div>






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
 */