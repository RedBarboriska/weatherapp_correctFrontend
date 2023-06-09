import styled from "styled-components";
import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import snowflake from "../../../img/snowflake.png"
import waterDrop from "../../../img/waterDrop.png"
import pressure from "../../../img/pressure.png"
import "../../../utils/scrollbar.css";
import UV from "./UV";

const HoursContainer = styled.div`
  display: flex;

  
`;
const HoursWidget = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  background-color: rgb(225,241,253);
  flex-direction: column;
  
`;
const ItemsSelector = styled.div`
  display: flex;
 

  
`;
//border-right: 2px solid #1B1E79;
const HoursItems = styled.div`

  padding: 10px;
  
 background-color: ${(props) => {
    const {colorValue} = props;
    const minValue = 0; // replace this with your actual min value
    const maxValue = 110; // replace this with your actual max value
   const color1 = {r: 226, g: 241, b: 253}; //світлий
   const color2 = {r: 68, g: 99, b: 174}; //темний
    const r = Math.round(color1.r + (colorValue - minValue) * (color2.r - color1.r) / (maxValue - minValue));
    const g = Math.round(color1.g + (colorValue - minValue) * (color2.g - color1.g) / (maxValue - minValue));
    const b = Math.round(color1.b + (colorValue - minValue) * (color2.b - color1.b) / (maxValue - minValue));
    return `rgb(${r}, ${g}, ${b})`;
}}

`;


export const HourlyForecast = ({data}) => {

    function checkValue(e, setState) {
        const value = e.target.value;
        console.log(e);
        console.log("You selected " + value);
        if (e.target.checked) {
            setState(true);
        } else {
            setState(false);
        }
    }

    // console.log(data)
    const [isPressure, setIsPressure] = useState(false);
    const [isWindKph, setIsWindKph] = useState(false);
    const forecastParams = useSelector((state) => state.forecastParams)

    let currentHour = parseInt(data.current.last_updated.substring(11, 13))


    function filteringCondition(startHour, endHour) {
        return (item, index) => index >= startHour && index <= endHour;
    }

    let filteredData = data.forecast.forecastday[0].hour.filter(filteringCondition(currentHour, (currentHour + 24)));
    if (filteredData.length < 24) {
        let nextDayData
        nextDayData = data.forecast.forecastday[1].hour.filter(filteringCondition(0, (24 - filteredData.length)));
        filteredData = filteredData.concat(nextDayData)
    }

    return (
        <HoursWidget class="container" >
            {/*<ItemsSelector>
                <div>Атмосферний тиск:<input type="checkbox" name="Pressure_in"
                                             onChange={(e) => checkValue(e, setIsPressure)}/></div>
                <div>Швидкість вітру:<input type="checkbox" name="Pressure_in"
                                            onChange={(e) => checkValue(e, setIsWindKph)}/></div>
            </ItemsSelector>*/}
            <HoursContainer class="scrollbar" id="scrollbar1">

                {filteredData.map((item, index) => (
                    <HoursItems key={index} className="item" colorValue={item.cloud}>
                        <div>{item.time.substring(11, 16)}</div>
                        <div>{item.temp_c} °C</div>
                        <div>
                            <img alt="condition.icon" src={`https:${item.condition.icon}`}/>
                        </div>

                       {/* <div>{item.condition.text}</div>*/}
                        <div>{item.last_updated}</div>
                        <div>
                            <img alt="waterdrop_icon" src={waterDrop} style={{ width: '10px' }}/>
                            {item.humidity}%
                        </div>
                        <div><img alt="pressure_icon" src={pressure} style={{ width: '10px' }}/>
                            {item.pressure_mb}</div>
                        {isWindKph && <>
                            <div>шв{item.wind_kph}</div>
                        </>}
                        { forecastParams.isChanceOfSnow && <div>

                            <img alt="snowflake_icon" src={snowflake} style={{ width: '10px' }}/>
                            {item.chance_of_snow}%
                        </div>}
                        {forecastParams.isPressure && <>
                            <UV uv={item.uv}/>
                            {/*<div><img alt="pressure_icon" src={pressure} style={{ width: '10px' }}/>
                                {item.pressure_mb}</div>*/}
                        </>}
                    </HoursItems>
                ))}

            </HoursContainer>
        </HoursWidget>
    );
}
// <input type="checkbox" name="Pressure_in" onChange={checkValue}/>
//<div>Відчувається як {item.feelslike_c} °C</div>

function MyComponent1(data) {
//прогноз на кожні дві години
    let currentHour = parseInt(data.current.last_updated.substring(11, 13))
    //let currentHour = 20
    const isCurrentHourOdd = currentHour % 2 === 1;


    function filteringCondition(startHour, endHour) {
        if (isCurrentHourOdd) {
            return (item, index) => index >= startHour && index <= endHour && index % 2 !== 0;
        } else {
            return (item, index) => index >= startHour && index <= endHour && index % 2 === 0;
        }
    }


    let filteredData = data.forecast.forecastday[0].hour.filter(filteringCondition(currentHour, (currentHour + 24)));

    if (filteredData.length < 6) {
        let nextDayData
        if (isCurrentHourOdd) {
            nextDayData = data.forecast.forecastday[1].hour.filter(filteringCondition(0, (0 + (12 - filteredData.length) * 2)));
        } else {
            nextDayData = data.forecast.forecastday[1].hour.filter(filteringCondition(1, (1 + (12 - filteredData.length) * 2)));
        }
        filteredData = filteredData.concat(nextDayData)
    }

    console.log(filteredData)
    console.log(currentHour)
    return (
        <HoursContainer>
            {filteredData.map((item, index) => (
                <HoursItems key={index} className="item">
                    <div>{item.time.substring(11, 16)}</div>
                    <div>{item.temp_c} °C</div>
                    <div>{item.condition.text}</div>
                    <div>{item.last_updated}</div>
                    <div>
                        <img alt="condition.icon" src={`https:${item.condition.icon}`}/>
                    </div>

                </HoursItems>
            ))}
        </HoursContainer>
    );
}
