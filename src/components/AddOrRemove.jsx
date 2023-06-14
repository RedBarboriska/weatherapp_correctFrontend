import {shallowEqual, useDispatch, useSelector} from "react-redux";
import minus from "../img/minus.png"
import plus from "../img/plus.png"
import WeatherInfoMain from "./WeatherWidget/WeatherInfoMain";
import styled from "styled-components";
import {addCity, getDashboard, removeCity} from "../DBcalls/DBcalls";
import {getUserInfo} from "../DBcalls/DBcalls";
import {fetchUserDashboardAsync, setDashboard, setUserInfo} from "../state/user.slice";
import {removeByKey, removeByProperties, weatherDataMapSelector} from "../state/weatherMap.slice";
import {getDataKey} from "./WeatherWidget/weatherWidget.helpers";

const AddOrRemoveWrapper = styled.div`
  //border: 2px solid #3e5ea2;
  //width: 20px;
  &:hover {
    cursor: pointer; /* Change the cursor style on hover */
  }
`
const AddOrRemove = ({weatherData, width}) => {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const geolocation = useSelector((state) => state.geolocation)
    //const weather = useSelector(state => weatherDataMapSelector(state, getDataKey(location), shallowEqual))
    // Check if dashboardInfo is an array before using the some function
    const isCityPresent = user.dashboardInfo.some(
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

                <img title="Вилучити з панелі віджетів" src={minus} alt="minus_icon"
                     style={{width: width, filter: 'brightness(0) saturate(100%) hue-rotate(120deg)'}}
                     onClick={
                         (event) => {
                             event.stopPropagation()
                             console.log("клік")
                             removeCity(
                                 user.token,
                                 weatherData.location.name,
                                 weatherData.location.region,
                                 weatherData.location.country)
                                 .then((r) => {
                                     dispatch(fetchUserDashboardAsync({token: user.token}))
                                     dispatch(removeByKey(`${weatherData.location.lat},${weatherData.location.lon},${weatherData.location.cityName}`)
                                         //`${city.city.latitude},${city.city.longitude},${city.city.cityName}`
                                         // dispatch(removeByProperties({name:weatherData.location.name, region:weatherData.location.region,country:weatherData.location.country})
                                         //dispatch(removeByKey(`${weatherData.location.lat},${weatherData.location.lon}`)

                                     )
                                 })
                         }}

                />}
            {!isCityPresent && <img title="Додати на панель віджетів" alt="plus_icon" src={plus}
                                    style={{width: '30px', filter: 'hue-rotate(120deg)'}}

                                    onClick={
                                        (event) => {
                                            event.stopPropagation()
                                            console.log("клік")
                                            addCity(user.token,
                                                weatherData.location.name,
                                                weatherData.location.region,
                                                weatherData.location.country,
                                                weatherData.location.lat,
                                                weatherData.location.lon)
                                                .then(r => dispatch(fetchUserDashboardAsync({token: user.token})))
                                        }}
            />}
        </AddOrRemoveWrapper>
    )
}
export default AddOrRemove;