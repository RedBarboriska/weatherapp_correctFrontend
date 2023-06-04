import React, {useEffect} from 'react';
import styled from "styled-components";
import formatDate from "../../utils/formatDate";
//import {DailyForecast} from "../DailyForecast";
//import {WeatherResponse} from "../../../state/weather/weather.types";
import './weatherInfoMain.css';
import {useDispatch, useSelector} from "react-redux";
import {addCity, removeCity, signUp} from "../../DBcalls/DBcalls";
import {HourlyForecast} from "./helpersComponents/HourlyForecast";
import {DailyForecast} from "./helpersComponents/DailyForecast";
import {changeIsChanceOfSnow, changeIsPressure} from "../../state/forecastParams.slice";
import AddOrRemove from "../AddOrRemove";
import {setSearchedCity} from "../../state/searchedCity.slice";


const ForecastParamsWrapper = styled.div`
  width: 100%;
  background-color: #E2F1FD;
  display: flex;
  flex-direction: row;
  text-align: left;
  padding-left: 10px;//вилазить!!!
 box-sizing: border-box;
  padding-bottom: 5px;

`

const WeatherInfoMain = ({weatherData}) => {

    const forecastParams = useSelector((state) => state.forecastParams)
    const user = useSelector((state) => state.user)
    const geolocation = useSelector((state) => state.geolocation)

    const dispatch = useDispatch()

    useEffect(() => {
       // if(forecastParams.isPressure){
        //
       // }
    })
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
                    <div className="wigetCityReg">{weatherData?.location.region}, {weatherData?.location.country} </div>
                    <div className="AddOrRemove">{user.token&&<AddOrRemove weatherData={weatherData} width={"30px"}/> }</div>

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
                   {/* <DailyForecast weatherData={weatherData}/>
                    <DailyForecast weatherData={weatherData}/>*/}
                    <DailyForecast weatherData={weatherData}/>
                </div>
            </div>
            <ForecastParamsWrapper>
                Атмосферний тиск:<input type="checkbox" name="at"
                                  onChange={() => {
                                      dispatch(changeIsPressure())
                                      if (JSON.parse(localStorage.getItem('isPressure'))) {
                                          localStorage.setItem('isPressure', JSON.stringify(false));
                                      } else {
                                          localStorage.setItem('isPressure', JSON.stringify(true));
                                      }
// dispatch(changeIsPressure())
                                  }}
                                  checked={JSON.parse(localStorage.getItem('isPressure')) === true}/>
                Ймовірність випадання снігу:<input type="checkbox" name="isSnow"
                                                     onChange={() =>{ dispatch(changeIsChanceOfSnow())
                                                         if (JSON.parse(localStorage.getItem('isChanceOfSnow'))) {
                                                             localStorage.setItem('isChanceOfSnow', JSON.stringify(false));
                                                         } else {
                                                             localStorage.setItem('isChanceOfSnow', JSON.stringify(true));
                                                         }
                                                     }

                }
                                                     checked={JSON.parse(localStorage.getItem('isChanceOfSnow')) === true}/>

            </ForecastParamsWrapper>
          <HourlyForecast data={weatherData}/>

        </div>

    )
}
//localStorage.setItem('isLogged', JSON.stringify(true))
//const retrievedValue = JSON.parse(localStorage.getItem('key'))

export default WeatherInfoMain;
