import {useSelector} from "react-redux";
import minus from "../img/minus.png"
import plus from "../img/plus.png"
import WeatherInfoMain from "./WeatherInfoMain";
import styled from "styled-components";

const AddOrRemoveWrapper= styled.div`
  //border: 2px solid #3e5ea2;
  //width: 20px;
`
const AddOrRemove = ({weatherData}) => {

    const user = useSelector((state) => state.user)
    const geolocation = useSelector((state) => state.geolocation)
    const isCityPresent = user.dashboardInfo.some(
        city =>
            (city?.cityName === weatherData.location.name &&
                city?.cityRegion === weatherData.location.region &&
                city?.cityCountry === weatherData.location.country) || (

                city?.latitude === {
                    $gte: parseFloat(geolocation?.latitude) - 0.2,
                    $lte: parseFloat(geolocation?.latitude) + 0.2
                },
                city?.longitude === {
                    $gte: parseFloat(geolocation?.longitude) - 0.2,
                    $lte: parseFloat(geolocation?.longitude) + 0.2
                }
            )
    )

return (<AddOrRemoveWrapper>
        {isCityPresent && <img src={minus} style={{ width: '30px', filter: 'brightness(0) saturate(100%) hue-rotate(120deg)' } }/>}
        {!isCityPresent && <img src={plus} style={{ width: '30px', filter: 'hue-rotate(120deg)' }}/>}
    </AddOrRemoveWrapper>
)
}
export default AddOrRemove;