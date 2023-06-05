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
                {/*user.isLogged && <div className="myCities" onClick={()=>{
                    console.log("клік")
                    dispatch(showMyCities())}}>Мої міста</div>*/}

                {/*{geolocation.latitude !== "" && <div className="myCities" onClick={() => {
                    console.log("клік")
                    dispatch(changeCoords({latitude: geolocation.latitude, longitude: geolocation.longitude}))
                }}>Моя геолокація</div>}*/}

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
                        {/*<input className="searchButton" type="submit" value="Пошук"
                           onClick={() => {
                               if (city !== "") {
                                   dispatch(changeCityname(city));
                               }
                           }}/>*/}


                        <img src={map_icon} className="searchButton" onClick={() => setShowMapModal(true)}/>
                        {/*<input className="searchButton" type="submit" value="Карта" onClick={() =>setShowMapModal(true)}/>*/}

                        {geolocation.latitude !== "" && <img src={geolocation_icon} className="searchButton"
                                                             onClick={() => {
                                                                 console.log("клік")
                                                                 dispatch(changeCoords({
                                                                     latitude: geolocation.latitude,
                                                                     longitude: geolocation.longitude
                                                                 }))
                                                             }} value={"Моя геолокація"}/>}
                    </div>
                </div>
                {user.token &&
                    <div className="userName">
                        <img src={user_icon} style={{width: "20px"}}/>
                        <div>{user.userInfo.name}</div>


                    </div>}
                {user.token && <div className="login" onClick={() => {
                    dispatch(userSignOut())
                    localStorage.removeItem('token');
                    dispatch(removeAll())
                }}>Вийти</div>}
                {!user.token &&

                    <div className="login" onClick={() => setShowSigningForm(true)}>
                        Увійти
                    </div>}
            </div>
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
            {showSigningForm &&
                ReactDOM.createPortal(<SigningForm onClose={() => setShowSigningForm(false)}/>, document.body)}


            {/*{showMapModal &&*/}
            {/*    <MapModal defaultLocation={mapInitialLocation}*/}
            {/*              onClose={(data) => {*/}
            {/*                  if (data) {*/}
            {/*                      fetchDataByQuery(data.latitude + ',' + data.longitude)*/}
            {/*                  } else {*/}
            {/*                      // fetchDataByQuery(mapInitialLocation.latitude + ',' + mapInitialLocation.longitude)*/}
            {/*                      //спірно*/}
            {/*                  }*/}
            {/*                  console.log('map cords')*/}
            {/*                  console.log(data)*/}
            {/*                  setShowMapModal(false)*/}
            {/*                  setInitialMap(null)*/}
            {/*              }}></MapModal>}*/}


        </>
    )
}

export default Header;

// <input className="searchButton" type="submit" value="Зарегатись"
//                            onClick={async () => await signUp('user2', '1111', 'Petro')}/>