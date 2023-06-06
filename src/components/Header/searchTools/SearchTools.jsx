import './searchTools.css';
import search_icon from "../../../img/search_icon.png";
import {changeCityname, changeCoords} from "../../../state/location.slice";
import map_icon from "../../../img/map_icon.png";
import geolocation_icon from "../../../img/geolocation_icon.png";
import Header from "../Header";
import ReactDOM from "react-dom";
import MapModal from "./Map/MapModal";
import {setInitialMap} from "./Map/maphelp";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {weatherDataSelector} from "../../../state/weather.slice";
import {getDataKey} from "../../WeatherWidget/weatherWidget.helpers";
import {useState} from "react";

const SearchTools = () => {

    const [city, setCity] = useState('');
    const [showMapModal, setShowMapModal] = useState(false);
    const location = useSelector((state) => state.location)
    const geolocation = useSelector((state) => state.geolocation)
    const dispatch = useDispatch()
    const weatherData = useSelector(state => weatherDataSelector(state, getDataKey(location)), shallowEqual) //location.latitude, location.longitude


    return (
        <div className="searchInput">
            <input className="searchBar" type="text"
                   placeholder="Введіть назву населеного пункту" value={city}
                   onChange={(e) => setCity(e.target.value)}/>
            <div className={"searchIcons"}>
                <img src={search_icon} className="searchButton" onClick={() => {
                    if (city !== "") {
                        dispatch(changeCityname(city));
                    }
                }}/>
                <img src={map_icon} className="searchButton" onClick={() => setShowMapModal(true)}/>
                {geolocation.latitude !== "" && <img src={geolocation_icon} className="searchButton"
                                                     onClick={() => {
                                                         console.log("клік")
                                                         dispatch(changeCoords({
                                                             latitude: geolocation.latitude,
                                                             longitude: geolocation.longitude
                                                         }))
                                                     }}/>}

                {showMapModal &&
                    ReactDOM.createPortal(<MapModal
                        defaultLocation={
                            weatherData?.location?.lat
                                ? {latitude: weatherData.location.lat, longitude: weatherData.location.lon}
                                : geolocation.latitude !== ''
                                    ? {latitude: geolocation.latitude, longitude: geolocation.longitude}
                                    : {latitude: "50.44989086706778", longitude: "30.524897236099616"}
                        }

                        onClose={(data) => {
                            if (data) {
                                dispatch(changeCoords(data))
                            } //під питанням
                            //setLocation(data)
                            setShowMapModal(false)
                            setInitialMap(null)
                        }}/>, document.body)}
            </div>
        </div>
    )
}
export default SearchTools;