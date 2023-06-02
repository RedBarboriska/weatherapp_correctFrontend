import styled from "styled-components";
import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import snowflake from "../img/snowflake.png"
import waterDrop from "../img/waterDrop.png"
import pressure from "../img/pressure.png"
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
    const reversValue = 100 - colorValue
    const minValue = 0; // replace this with your actual min value
    const maxValue = 100; // replace this with your actual max value
//rgb(226,241,253)
    //const color1 = {r: 129, g: 131, b: 192}; // replace with your first color
    //const color2 = {r: 188, g: 190, b: 249}; // replace with your second color
   const color1 = {r: 68, g: 99, b: 174}; // replace with your first color
   const color2 = {r: 226, g: 241, b: 253};
    //rgb(226,241,253) rgb(68,99,174)
    /*const r = Math.round(129 + (reversValue - minValue) * (229 - 129) / (maxValue - minValue));
    const g = Math.round(131 + (reversValue - minValue) * (230 - 131) / (maxValue - minValue));
    const b = Math.round(192 + (reversValue - minValue) * (255 - 192) / (maxValue - minValue));*/
    const r = Math.round(color1.r + (reversValue - minValue) * (color2.r - color1.r) / (maxValue - minValue));
    const g = Math.round(color1.g + (reversValue - minValue) * (color2.g - color1.g) / (maxValue - minValue));
    const b = Math.round(color1.b + (reversValue - minValue) * (color2.b - color1.b) / (maxValue - minValue));
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
        <HoursWidget>
            {/*<ItemsSelector>
                <div>Атмосферний тиск:<input type="checkbox" name="Pressure_in"
                                             onChange={(e) => checkValue(e, setIsPressure)}/></div>
                <div>Швидкість вітру:<input type="checkbox" name="Pressure_in"
                                            onChange={(e) => checkValue(e, setIsWindKph)}/></div>
            </ItemsSelector>*/}
            <HoursContainer>
                {filteredData.map((item, index) => (
                    <HoursItems key={index} className="item" colorValue={item.cloud}>
                        <div>{item.time.substring(11, 16)}</div>
                        <div>{item.temp_c} °C</div>
                        <div>
                            <img src={`https:${item.condition.icon}`}/>
                        </div>

                       {/* <div>{item.condition.text}</div>*/}
                        <div>{item.last_updated}</div>
                        <div>
                            <img src={waterDrop} style={{ width: '10px' }}/>
                            {item.humidity}%
                        </div>
                        {forecastParams.isPressure && <>
                            <div><img src={pressure} style={{ width: '10px' }}/>
                                {item.pressure_mb}</div>
                        </>}
                        {isWindKph && <>
                            <div>шв{item.wind_kph}</div>
                        </>}
                        { forecastParams.isChanceOfSnow && <div>
                            <img src={snowflake} style={{ width: '10px' }}/>
                            {item.chance_of_snow}%</div>

                        }

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
                        <img src={`https:${item.condition.icon}`}/>
                    </div>

                </HoursItems>
            ))}
        </HoursContainer>
    );
}
