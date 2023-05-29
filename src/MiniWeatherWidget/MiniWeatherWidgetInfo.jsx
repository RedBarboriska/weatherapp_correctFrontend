import React from "@types/react";
import "./miniWeatherWidget.css"

const MiniWeatherWidgetInfo = (data) => {
    return (<>
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
    </>)

}

export default MiniWeatherWidgetInfo