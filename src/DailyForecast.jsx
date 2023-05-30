import styled from "styled-components";
import React from 'react';
import formatDate from "./FormatDate";

const DaysContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  border-bottom-left-radius: 20px;
  width:45%;

  
`;
//border-right: 2px solid #1B1E79;
const DayItems = styled.div`
  padding: 10px;
  background-color: #cae4fa;
  width:50%;
  
`;


export const DailyForecast = ({weatherData}) => {
    console.log(weatherData)

    const filteredArray = weatherData.forecast.forecastday.slice(1); // creates a new array containing the last two objects

    console.log(filteredArray); // Output: [{id: 2, name: 'Object 2'}, {id: 3, name: 'Object 3'}]


    return (
        <DaysContainer>
            {filteredArray.map((item, index) => (
                <DayItems key={index} className="item">
                    <div>{formatDate(item.date)}</div>
                    <div>{item.day.avgtemp_c} °C</div>
                    <div>
                        <img src={`https:${item.day.condition.icon}`}/>
                    </div>

                    <div>{item.day.condition.text}</div>
                    <div>Макс: {item.day.maxtemp_c}°C</div>
                    <div>Мін: {item.day.mintemp_c}°C</div>


                </DayItems>
            ))}
        </DaysContainer>
    );
}

//<div>Відчувається як {item.feelslike_c} °C</div>

