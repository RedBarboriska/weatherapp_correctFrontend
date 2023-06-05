import './header.css';
//import WeatherInfoMain from "../WeatherWidget/WeatherInfoMain";
import MapModal from "../Map/MapModal";
//import {setInitialMap} from "../Map/maphelp";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {weatherDataSelector} from "../../state/weather.slice";
import {getDataKey} from "../WeatherWidget/weatherWidget.helpers";
import {changeCityname, changeCoords} from "../../state/location.slice";
import SigningForm from "./SigningForm";
import ReactDOM from "react-dom";
import {fetchUserInfoAsync, userSignOut} from "../../state/user.slice";
import React, {useEffect, useState} from "react";
import {setInitialMap} from "../Map/maphelp";
import {SearchOutlined} from "@ant-design/icons";
import {removeAll} from "../../state/weatherMap.slice";
import user_icon from "../../img/user_icon.png";
import geolocation_icon from "../../img/geolocation_icon.png";
import map_icon from "../../img/map_icon.png";
import search_icon from "../../img/search_icon.png";
import {Space} from "antd";
import Search from "antd/es/input/Search";
import SearchTools from "./SearchTools";
import UserMenu from "./UserMenu";


const Header = () => {
    const [city, setCity] = useState('');
    const [showMapModal, setShowMapModal] = useState(false);
    const [showSigningForm, setShowSigningForm] = useState(false);
    // const [widgets, setWidgets] = useState([{id: nextId}])
    const location = useSelector((state) => state.location)
    const geolocation = useSelector((state) => state.geolocation)
    const dispatch = useDispatch()
    const weatherData = useSelector(state => weatherDataSelector(state, getDataKey(location)), shallowEqual) //location.latitude, location.longitude
    const user = useSelector((state) => state.user)
    const myCities = useSelector((state) => state.myCities)
    useEffect(() => {

        console.log("DISPATCH USER INFO")
        console.log(user.token)
        dispatch(fetchUserInfoAsync({token: user.token}))

    }, [user.token])
    /*console.log(weatherData?.location?.lat)
    console.log(geolocation)
    console.log(geolocation.latitude)
    console.log(geolocation.longitude)*/
    /*  const onCloseHandler = useCallback(() => {
          onClose(selectedPoint);
      }, [onClose, selectedPoint]);*/
    /* const handleClick = () => {
         console.log('clicked')
         setShowMapModal(true)

     }*/

    return (<>
            <div className="App-header">
                <div className="logo">Погодниця</div>

                <SearchTools/>


                {user.token &&
                    <UserMenu/>}

                {!user.token &&

                    <div className="login" onClick={() => setShowSigningForm(true)}>
                        Увійти
                    </div>}
            </div>

            {showSigningForm &&
                ReactDOM.createPortal(<SigningForm onClose={() => setShowSigningForm(false)}/>, document.body)}


        </>
    )
}

export default Header;

// <input className="searchButton" type="submit" value="Зарегатись"
//                            onClick={async () => await signUp('user2', '1111', 'Petro')}/>