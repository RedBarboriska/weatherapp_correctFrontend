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
import {Tooltip, Typography} from "antd";
import {tooltipClasses} from "@mui/material";
import UV from "./helpersComponents/UV";
import moment from 'moment';

const ForecastParamsWrapper = styled.div`
  width: 100%;
  background-color: #E2F1FD;
  display: flex;
  flex-direction: row;
  text-align: left;
  padding-left: 10px; //вилазить!!!
  box-sizing: border-box;
  padding-bottom: 5px;

`

const HtmlTooltip = styled(({className, ...props}) => (
    <Tooltip {...props} classes={{popper: className}}/>
))(({theme}) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        border: '1px solid #dadde9',
    },
}));


const WeatherInfoMain = ({weatherData}) => {

    let backgroundColor;

    if (weatherData && weatherData.current.uv >= 1 && weatherData.current.uv <= 2) {
        backgroundColor = 'rgba(184, 255, 147, 0.3)'; // Колір для UV 1-2
    } else if (weatherData && weatherData.current.uv >= 3 && weatherData.current.uv <= 5) {
        backgroundColor = 'rgba(255, 248, 65, 0.3)'; // Колір для UV 3-5
    } else if (weatherData && weatherData.current.uv >= 6 && weatherData.current.uv <= 10) {
        backgroundColor = 'rgba(255, 150, 28, 0.3)'; // Колір для UV 6-10
    } else {
        backgroundColor = 'rgba(255, 0, 0, 0.3)'; // Колір за замовчуванням
    }

    const forecastParams = useSelector((state) => state.forecastParams)
    const user = useSelector((state) => state.user)
    const geolocation = useSelector((state) => state.geolocation)

    const dispatch = useDispatch()

    useEffect(() => {
        // if(forecastParams.isPressure){
        //
        // }
    })


    return (
        <div className="mainWeatherWidget">
            <div className="test">
                <div className="wigetCityDiv">
                    <div className="wigetCityName">{weatherData?.location.name}</div>
                    <div className="wigetCityReg">{weatherData?.location.region}, {weatherData?.location.country} </div>
                    <div className="AddOrRemove">{user.token &&
                        <AddOrRemove weatherData={weatherData} width={"30px"}/>}</div>

                </div>
                <div className="wigetMain">
                    <div className="wigetColumns2">
                        <div className="degree">{weatherData?.current.temp_c}°C<img alt="condition.icon"
                                                                                    src={`https:${weatherData?.current.condition.icon}`}
                        /></div>
                        <div>{weatherData?.current.condition.text}</div>
                        <div>
                            <div>Макс....{weatherData?.forecast.forecastday[0].day.maxtemp_c}°</div>
                            <div>Мін......{weatherData?.forecast.forecastday[0].day.mintemp_c}°</div>
                        </div>
                        {/*<div className="minmaxContainer">
                            <div className="minmaxTemp">
                                <div className="minmaxName">Мін</div>
                                <div className="minmaxValue">{weatherData?.forecast.forecastday[0].day.mintemp_c}°</div>
                            </div>
                            <div className="minmaxTemp">
                                <div className="minmaxName">Макс</div>
                                <div className="minmaxValue">{weatherData?.forecast.forecastday[0].day.maxtemp_c}°</div>
                            </div>
                        </div>*/}


                    </div>
                    <div className="wigetColumns1">
                        <div>{formatDate(weatherData?.current.last_updated)} {weatherData?.current.last_updated.substring(11, 16)}</div>
                        <hr/>
                        <div className="wigetAttr">
                            <div className="left">
                                Відчувається як:
                            </div>
                            <div className="right">
                                {weatherData?.current.feelslike_c}°C
                            </div>
                        </div>
                        <hr/>
                        <div className="wigetAttr">
                            <div className="left">
                                Вологість:
                            </div>
                            <div className="right">
                                {weatherData?.current.humidity}%
                            </div>
                        </div>
                        <hr/>
                        <div className="wigetAttr">
                            <div className="left">
                                Хмарність:
                            </div>
                            <div className="right">
                                {weatherData?.current.cloud}%
                            </div>
                        </div>
                        <hr/>
                        <UV uv={weatherData?.current.uv}/>


                    </div>
                    <div className="wigetColumns1">
                        <div className="wigetAttr">
                            <div className="left">
                                Кількість опадів:
                            </div>
                            <div className="right">
                                {weatherData?.current.precip_mm}мм
                            </div>

                        </div>
                        <hr/>
                        <div className="wigetAttr">
                            <div className="left">
                                Видимість:
                            </div>
                            <div className="right">
                                {weatherData?.current.vis_km}км
                            </div>
                        </div>
                        <hr/>
                        <div className="wigetAttr">
                            <div className="left">
                                Швидкість вітру:
                            </div>
                            <div className="right">
                                {weatherData?.current.wind_kph}км/год
                            </div>

                        </div>
                        <hr/>
                        <div className="wigetAttr">
                            <div className="left">
                                Максимальна:
                            </div>
                            <div className="right">
                                {weatherData?.forecast.forecastday[0].day.maxwind_kph}км/год
                            </div>

                        </div>
                        <hr/>


                    </div>
                    <div className="wigetColumns1">

                        <div className="wigetAttr">
                            <div className="left">
                                Фаза:
                            </div>
                            <div className="right">
                                {weatherData?.forecast.forecastday[0].astro.moon_phase}
                            </div>

                           </div>
                        <hr/>
                        <div className="wigetAttr">
                            <div className="left">
                                Схід місяця:
                            </div>
                            <div className="right">
                                {moment(weatherData?.forecast.forecastday[0].astro.moonrise, 'hh:mm A').format('HH:mm')}
                            </div>

                        </div>
                        <hr/>
                        <div className="wigetAttr">
                            <div className="left">
                                Захід
                                місяця:
                            </div>
                            <div className="right">
                                {moment(weatherData?.forecast.forecastday[0].astro.moonset, 'hh:mm A').format('HH:mm')}
                            </div>

                        </div>
                        <hr/>
                        <div className="wigetAttr">

                            <div className="left">
                                Схід
                                сонця:
                            </div>
                            <div className="right">
                                {moment(weatherData?.forecast.forecastday[0].astro.sunrise, 'hh:mm A').format('HH:mm')}
                            </div>


                        </div>
                        <hr/>
                        <div className="wigetAttr">
                            <div className="left">
                                Захід
                                сонця:
                            </div>
                            <div className="right">
                                {moment(weatherData?.forecast.forecastday[0].astro.sunset, 'hh:mm A').format('HH:mm')}
                            </div>
                        </div>

                    </div>

                    <DailyForecast weatherData={weatherData}/>
                </div>
            </div>
            <ForecastParamsWrapper>

                Ймовірність випадіння снігу:<input type="checkbox" name="isSnow"
                                                   onChange={() => {
                                                       dispatch(changeIsChanceOfSnow())
                                                       if (JSON.parse(localStorage.getItem('isChanceOfSnow'))) {
                                                           localStorage.setItem('isChanceOfSnow', JSON.stringify(false));
                                                       } else {
                                                           localStorage.setItem('isChanceOfSnow', JSON.stringify(true));
                                                       }
                                                   }

                                                   }
                                                   checked={JSON.parse(localStorage.getItem('isChanceOfSnow')) === true}/>
                UV-індекс:<input type="checkbox" name="at"
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
            </ForecastParamsWrapper>
            <HourlyForecast data={weatherData}/>

        </div>

    )
}
//localStorage.setItem('isLogged', JSON.stringify(true))
//const retrievedValue = JSON.parse(localStorage.getItem('key'))

export default WeatherInfoMain;
