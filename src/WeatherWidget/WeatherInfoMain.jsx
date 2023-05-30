import React from 'react';
import styled from "styled-components";
import formatDate from "../FormatDate";
//import {DailyForecast} from "../DailyForecast";
//import {WeatherResponse} from "../../../state/weather/weather.types";
import './weatherInfoMain.css';
import {useDispatch, useSelector} from "react-redux";
import {addCity, removeCity, signUp} from "../DBcalls/DBcalls";
import {HourlyForecast} from "../HourlyForecast";
import {DailyForecast} from "../DailyForecast";



const WeatherInfoMain = ({weatherData}) => {

   // const user = useSelector((state) => state.user)
    const geolocation = useSelector((state) => state.geolocation)
    const dispatch = useDispatch()
/*    const isCityPresent = user.dashboardInfo.some(
        city =>
            (city.cityName === data.location.name &&
                city.cityRegion === data.location.region &&
                city.cityCountry === data.location.country) || (

                city.latitude === {
                    $gte: parseFloat(geolocation.latitude) - 0.2,
                    $lte: parseFloat(geolocation.latitude) + 0.2
                },
                city.longitude === {
                    $gte: parseFloat(geolocation.longitude) - 0.2,
                    $lte: parseFloat(geolocation.longitude) + 0.2
                }
            )
    );*/

    return (
        <div className="mainWeatherWidget">
            <div className="test">
                <div className="wigetCityDiv">
                    <div className="wigetCityName">{weatherData?.location.name}</div>
                    <div className="wigetCityReg">{weatherData?.location.region}, {weatherData?.location.country}</div>
                  {/*  {user.isLogged && <>
                        {isCityPresent ? (
                            <input type="submit"
                                   onClick={async () => await dispatch(removeCity(user.userInfo.login, data.location.name, data.location.region, data.location.country))}
                                   value="Мінус"/>

                        ) : (
                            <input type="submit"
                                   onClick={async () => await dispatch(addCity(user.userInfo.login, data.location.name, data.location.region, data.location.country, data.location.lat, data.location.lon))}
                                   value="Плюс"/>
                        )}
                    </>}*/}
                </div>
                <div className="wigetMain">
                    <div className="wigetColumns1">
                        <div>{formatDate(weatherData?.current.last_updated)} {weatherData?.current.last_updated.substring(11, 16)}</div>
                        <hr/>
                        <div className="wigetAttr">Відчувається як {weatherData?.current.feelslike_c}°C</div>
                        <hr/>
                        <div className="wigetAttr">Вологість: {weatherData?.current.humidity}%</div>
                        <hr/>
                        <div className="wigetAttr">Хмарність: {weatherData?.current.cloud}%</div>
                        <hr/>
                        <div className="wigetAttr">UV: {weatherData?.current.uv}</div>

                    </div>
                    <div className="wigetColumns2">
                        <div className="degree">{weatherData?.current.temp_c}°C<img
                            src={`https:${weatherData?.current.condition.icon}`}
                        /></div>
                        <div>{weatherData?.current.condition.text}</div>
                    </div>
                    <DailyForecast weatherData={weatherData}/>
                </div>
            </div>
          <HourlyForecast data={weatherData}/>

        </div>

    )
}


export default WeatherInfoMain;
