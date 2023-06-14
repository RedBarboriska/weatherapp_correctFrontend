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
                    <div className="AddOrRemove">{user.token &&
                        <AddOrRemove weatherData={weatherData} width={"30px"}/>}</div>

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
                        <div className="wigetAttr">Відчувається як {weatherData?.current.feelslike_c}°C</div>
                        <hr/>
                        <div className="wigetAttr">Вологість: {weatherData?.current.humidity}%</div>
                        <hr/>
                        <div className="wigetAttr">Хмарність: {weatherData?.current.cloud}%</div>
                        <hr/>
                        <UV uv={weatherData?.current.uv}/>
                        {/*<HtmlTooltip
                            title={
                                <React.Fragment>
                                    <Typography color="inherit">Tooltip with HTML</Typography>
                                    <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                                    {"It's very engaging. Right?"}
                                </React.Fragment>
                            }
                        >
                            <div className="wigetAttr" style={{backgroundColor}}>UV: {weatherData?.current.uv}</div>
                        </HtmlTooltip>*/}

                    </div>
                    <div className="wigetColumns1">
                        <div>
                            Кількість опадів: {weatherData?.current.precip_mm}мм
                        </div>
                        <hr/>
                        <div
                            className="wigetAttr">Видимість: {weatherData?.current.vis_km}км
                        </div>
                        <hr/>
                        <div className="wigetAttr">Швидкість вітру: {weatherData?.current.wind_kph}км/год</div>
                        <hr/>
                        <div
                            className="wigetAttr">Максимальна: {weatherData?.forecast.forecastday[0].day.maxwind_kph}км/год
                        </div>
                        <hr/>


                    </div>
                    <div className="wigetColumns1">

                        <div>Фаза:{weatherData?.forecast.forecastday[0].astro.moon_phase}</div>
                        <hr/>
                        <div className="wigetAttr">Схід
                            місяця: {moment(weatherData?.forecast.forecastday[0].astro.moonrise, 'hh:mm A').format('HH:mm')}
                        </div>
                        <hr/>
                        <div className="wigetAttr">Захід
                            місяця: {moment(weatherData?.forecast.forecastday[0].astro.moonset, 'hh:mm A').format('HH:mm')}
                        </div>
                        <hr/>
                        <div className="wigetAttr">Схід
                            сонця: {moment(weatherData?.forecast.forecastday[0].astro.sunrise, 'hh:mm A').format('HH:mm')}
                        </div>
                        <hr/>
                        <div className="wigetAttr">Захід
                            сонця: {moment(weatherData?.forecast.forecastday[0].astro.sunset, 'hh:mm A').format('HH:mm')}
                        </div>

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

            </ForecastParamsWrapper>
            <HourlyForecast data={weatherData}/>

        </div>

    )
}
//localStorage.setItem('isLogged', JSON.stringify(true))
//const retrievedValue = JSON.parse(localStorage.getItem('key'))

export default WeatherInfoMain;
