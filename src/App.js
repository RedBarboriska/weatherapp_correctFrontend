import './App.css';
import React, {useEffect, useRef, useState} from 'react';
import {getForecastWeatherData, getWeatherData} from "./utils/api";
import {getUserLocation} from "./utils/utils";
import Login from "./components/Header/signingForm/Login";
import {buildMap, setInitialMap} from "./components/Header/searchTools/Map/maphelp";
import MapModal from "./components/Header/searchTools/Map/MapModal";
import styled from "styled-components";
import axios from 'axios';
//import Login from "./Login";

import hourlyForecast, {HourlyForecast} from "./components/WeatherWidget/helpersComponents/HourlyForecast";
import {DailyForecast} from "./components/WeatherWidget/helpersComponents/DailyForecast";
import refresh_icon from "./img/refresh_icon.png"
import formatDate from "./utils/formatDate";
import LoadingSpinner from "./components/LoadingSpinner";
import {Spin} from "antd";
import {changeCoords} from "./state/location.slice";
import SigningFrorm from "./components/Header/signingForm/SigningFormModal";


//import setInitialMap from "./Map/maphelp";


function App() {


    const handleClick = () => {

        console.log('clicked')
        setShowMapModal(true)

    }


    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({})
    const [geoError, setGeoError] = useState(null)
    const [searchError, setSearchError] = useState(null)
    const [city, setCity] = useState('');
    const [refreshCity, setRefreshCity] = useState('');

    const [geolocation, setGeolocation] = useState(null);
    const [showMapModal, setShowMapModal] = useState(false);
    const [mapInitialLocation, setMapInitialLocation] = useState(null);
    const [geoCallback, setGeoCallback] = useState(false);
    const [forecast, setForecast] = useState({});
    //export const [isLogged, setIsLogged] = useState(false);
    // export const [loginData, setLoginData] = useState({});

    const [backendData, setBackendData] = useState([{}])

   /* useEffect(() => {
        fetch('http://localhost:5000/api').then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data)
                console.log(data)
            }
        )
        console.log('backendData')
        const login = 'user1';
        const password = '1111';
        const login2 = 'user2';
        const name = 'Petro';
        /*axios.post('http://localhost:5000/login', {login, password})
            .then(response => {
                console.log(response.data);
                //null
            })
            .catch(error => {
                console.error(error);
            });*/

    /*}, [])*/


    const fetchDataByQuery = async (query) => {
        setSearchError(null)
        // setGeoError(null)
        setIsLoading(true);
        setRefreshCity(query)
        const jsonData = await getWeatherData(query)
        // const jsonData2 = await getForecastWeatherData(query)
        console.log(jsonData)
        // console.log(jsonData2)
        /*try {
            jsonData.location
        } catch (e) {
            console.error(e);
        }*/
        if (jsonData.error !== undefined) {
            console.log(jsonData.type)
            console.log(jsonData.error)
            console.log(jsonData.error.code)
            setSearchError(jsonData.error)
        }
        setData(jsonData)
        /*setMapInitialLocation({
            latitude: data.location.lat,
            longitude: data.location.lon
        })*/
        setIsLoading(false);
    }

    useEffect(() => {
        getUserLocation(async (position) => {
            //await setGeolocation(position)
            //await console.log(geolocation)
            await setMapInitialLocation({
                latitude: await position.coords.latitude,
                longitude: await position.coords.longitude
            })
            //await setCity(`${position.coords.latitude},${position.coords.longitude}`)
            await setGeolocation(`${position.coords.latitude},${position.coords.longitude}`)
            await fetchDataByQuery(`${position.coords.latitude},${position.coords.longitude}`)
            await setGeoCallback(true)
        }, error => {
            setGeoError(error)
            setMapInitialLocation({latitude: 50.45555430521778, longitude: 30.519585004959335})
            console.log(error)
            setGeoCallback(true)
        })

        /*console.log(geolocation)
        if (geolocation) {
            setMapInitialLocation({latitude: geolocation.coords.latitude, longitude: geolocation.coords.longitude})
            console.log(mapInitialLocation)
        } else {
            setMapInitialLocation({latitude: 50.45555430521778, longitude: 30.519585004959335})
            console.log(mapInitialLocation)
        }*/
    }, []);


    return (<div className="App">

        <div className="App-header">
            <div className="logo">Погодниця</div>
            {/*<div className="myCities">Мої міста</div>*/}

            <div className="searchInput">
                <input className="searchBar" type="text"
                       placeholder="Введіть назву населеного пункту" value={city}
                       onChange={(e) => setCity(e.target.value)}/>
                <input className="searchButton" type="submit" value="Пошук"
                       onClick={async () => await fetchDataByQuery(city)}/>

                <input className="searchButton" type="submit" value="Карта" onClick={handleClick}/>
                <input className="searchButton" type="submit" value="Зарегатись"
                       onClick={async () => await signUp('user2', '1111', 'Petro')}/>
            </div>

            <div className="login">Увійти</div>
        </div>
        {/* <SigningFrorm/>*/}

        {showMapModal &&
            <MapModal defaultLocation={mapInitialLocation}
                      onClose={(data) => {
                          if (data) {
                              fetchDataByQuery(data.latitude + ',' + data.longitude)
                          } else {
                              // fetchDataByQuery(mapInitialLocation.latitude + ',' + mapInitialLocation.longitude)
                              //спірно
                          }
                          console.log('map cords')
                          console.log(data)
                          setShowMapModal(false)
                          setInitialMap(null)
                      }}></MapModal>}

        <div className="maincontent">

            {isLoading && <>
                {geoError && "Дозвольте доступ до Вашого місцезнаходження, щоб отримати прогноз погоди у Вашому місті"}
                {!geoError && <p>Завантаження... </p>}
            </>}
            {!isLoading && searchError && <>
                <div>За вашим запитом нічого не знайдено</div>
            </>}
            {!isLoading && !searchError && <>

                {!geoError && refreshCity !== geolocation && <>
                    {console.log('проблема пошуку через карту, потрібно звести до одного формату refreshCity і geolocation')}
                    {console.log(refreshCity)}
                    {console.log(geolocation)}
                    <input className="searchButton" type="submit" value="back to geolocation"
                           onClick={async () => await fetchDataByQuery(geolocation)}/>
                </>}

                <div className="mainWeatherWidget">
                    <div className="test">
                        <div className="wigetCityDiv">
                            <div className="wigetCityName">{data.location.name}</div>
                            <div className="wigetCityReg">{data.location.region}, {data.location.country}</div>
                        </div>
                        <div className="wigetMain">
                            <div className="wigetColumns1">
                                <div>{formatDate(data.current.last_updated)} {data.current.last_updated.substring(11, 16)}</div>
                                <hr/>
                                <div className="wigetAttr">Відчувається як {data.current.feelslike_c}°C</div>
                                <hr/>
                                <div className="wigetAttr">Вологість: {data.current.humidity}%</div>
                                <hr/>
                                <div className="wigetAttr">Хмарність: {data.current.cloud}%</div>
                                <hr/>
                                <div className="wigetAttr">UV: {data.current.uv}</div>

                            </div>
                            <div className="wigetColumns2">
                                <div className="degree">{data.current.temp_c}°C<img
                                    src={`https:${data.current.condition.icon}`}
                                /></div>
                                <div>{data.current.condition.text}</div>
                            </div>
                            <DailyForecast data={data}/>
                        </div>
                    </div>


                    <HourlyForecast data={data}/>

                </div>

                <div className="miniWeatherWidget">
                    <div className="cityName">{data.location.name}</div>
                    <div className="regionName">{data.location.region}</div>
                    <div className="regionName">{data.location.country}</div>
                    <div className="mainInfo">
                        <div><img src={`https:${data.current.condition.icon}`}/></div>
                        <div className="temperature">{data.current.temp_c}°C</div>
                    </div>
                    <div className="minmax">
                        <div className="minmaxNames">
                            <div>мін</div>
                            <div>макс</div>
                        </div>
                        <div className="minmaxTemp">
                            <div>{data.forecast.forecastday[0].day.mintemp_c}°</div>
                            <div>{data.forecast.forecastday[0].day.maxtemp_c}°</div>
                        </div>
                    </div>

                </div>
            </>}


        </div>
    </div>);
}

export default App;
//
// //cdn.weatherapi.com/weather/64x64/day/116.png
//http://api.weatherapi.com/v1/current.json?&key=2c4bf9b50dec4d1eaad114823232704&q=51.6938446,-0.1774186&lang=uk
// <MapViewer onClick={handleClick} defaultLocation={{latitude: 37.7749, longitude: -122.4194}}/>
//            <MapComponent> </MapComponent>


///
// http://api.weatherapi.com/v1/forecast.json?&days=5&key=2c4bf9b50dec4d1eaad114823232704&q=51.6938446,-0.1774186&lang=uk
//https://api.weatherapi.com/v1/forecast.json?&days=3&key=2c4bf9b50dec4d1eaad114823232704&q=51.6938446,-0.1774186&lang=uk
// future.json
//forecastday
//days=5


/*
<input className="searchButton" type="submit" value="refresh"
                       onClick={async () => await fetchDataByQuery(refreshCity)}/>
<div>{data.location.name}</div>
                <div>{data.location.region}</div>
                <div>{data.location.country}</div>
                <div>{data.current.temp_c} °C</div>
                <div>Відчуваєтья як {data.current.feelslike_c} °C</div>
                <div>{data.current.condition.text}</div>
                <div>{data.current.last_updated}</div>
                <div>
                    <img src={`https:${data.current.condition.icon}`}/>
                </div>

                <input className="searchButton" type="submit" value="Вибрати параметри"/>*/
//Прогноз на наступні 2 дні:
// <div>Погодинний прогноз:</div>
/* <div className="wigetColumns3">

                        </div>
                        <div className="wigetColumns4">
                            <div>
                                <img src={refresh_icon} onClick={async () => await fetchDataByQuery(refreshCity)}/>
                            </div>
                            <div>+</div>
                            <div>-</div>
                        </div>

                     <Spin spinning={true}></Spin>

                        */