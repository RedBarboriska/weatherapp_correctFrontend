import {useDispatch, useSelector} from "react-redux";
import minus from "../img/minus.png"
import plus from "../img/plus.png"
import WeatherInfoMain from "./WeatherInfoMain";
import styled from "styled-components";
import {addCity, getDashboard, removeCity} from "../DBcalls/DBcalls";
import {getUserInfo} from "../DBcalls/DBcalls";
import {setDashboard, setUserInfo} from "../state/user.slice";
const AddOrRemoveWrapper= styled.div`
  //border: 2px solid #3e5ea2;
  //width: 20px;
  &:hover {
    cursor: pointer; /* Change the cursor style on hover */
  }
`
const AddOrRemove = ({weatherData}) => {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const geolocation = useSelector((state) => state.geolocation)
    // Check if dashboardInfo is an array before using the some function
    const isCityPresent = Array.isArray(user.dashboardInfo) && user.dashboardInfo.some(
        city =>
            (city?.cityName === weatherData.location.name &&
                city?.cityRegion === weatherData.location.region &&
                city?.cityCountry === weatherData.location.country) /*|| (

                city?.latitude === {
                    $gte: parseFloat(geolocation?.latitude) - 0.2,
                    $lte: parseFloat(geolocation?.latitude) + 0.2
                },
                city?.longitude === {
                    $gte: parseFloat(geolocation?.longitude) - 0.2,
                    $lte: parseFloat(geolocation?.longitude) + 0.2
                }
            )*/
    );


    return (<AddOrRemoveWrapper>
        {isCityPresent &&

            <img src={minus} style={{ width: '30px', filter: 'brightness(0) saturate(100%) hue-rotate(120deg)' } }
                 onClick = {
                     (event)=>{
                         event.stopPropagation()
                         console.log("клік")
                         removeCity(
                             user.token,
                             weatherData.location.name,
                             weatherData.location.region,
                             weatherData.location.country)
                             .then(r => getDashboard(user.token)
                                 .then(dashboardResponse => {
                                     console.log("dashboardResponse")
                                     console.log(dashboardResponse)
                                     dispatch(setDashboard(dashboardResponse))
                                 })
                                 .catch(error => {
                                     console.log(error)

                                 })) } }

        />}
        {!isCityPresent && <img src={plus} style={{ width: '30px', filter: 'hue-rotate(120deg)' }}

                                onClick = {
                                    (event)=>{
                                        event.stopPropagation()
                                        console.log("клік")
                                        addCity(user.token,
                                            weatherData.location.name,
                                            weatherData.location.region,
                                            weatherData.location.country,
                                            weatherData.location.lat,
                                            weatherData.location.lon)
                                            .then(r => getDashboard(user.token)
                                                .then(dashboardResponse => {
                                                    console.log("dashboardResponse")
                                                    console.log(dashboardResponse)
                                                    dispatch(setDashboard(dashboardResponse))
                                                })
                                                .catch(error => {
                                                    console.log(error)

                                                })) } }
        />}
    </AddOrRemoveWrapper>
)
}
export default AddOrRemove;