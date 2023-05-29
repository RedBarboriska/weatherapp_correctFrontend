import {signUp} from "../DBFunctions";
import React, {useCallback, useState} from "@types/react";
import './header.css';
import WeatherInfoMain from "../WeatherWidget/WeatherInfoMain";
import MapModal from "../Map/MapModal";
import {setInitialMap} from "../Map/maphelp";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {weatherDataSelector} from "../state/weather.slice";
import {getDataKey} from "../WeatherWidget/weatherWidget.helpers";
import {changeCityname, changeCoords} from "../state/location.slice";
import SigningForm from "./SigningForm";
import ReactDOM from "react-dom";
import {userSignOut} from "../state/user.slice";

const Header = () => {
    const [city, setCity] = useState('');
    const [showMapModal, setShowMapModal] = useState(false);
    const [showSigningForm, setShowSigningForm] = useState(false);
    // const [widgets, setWidgets] = useState([{id: nextId}])
    const dispatch = useDispatch()
    const weatherData = useSelector(state => weatherDataSelector(state, getDataKey(location)), shallowEqual)
    const user = useSelector((state) => state.user)
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
                {user.isLogged && <div className="myCities">Мої міста</div>}

                <div className="searchInput">
                    <input className="searchBar" type="text"
                           placeholder="Введіть назву населеного пункту" value={city}
                           onChange={(e) => setCity(e.target.value)}/>
                    <input className="searchButton" type="submit" value="Пошук"
                           onClick={dispatch(changeCityname(city))}/>

                    <input className="searchButton" type="submit" value="Карта" onClick={setShowMapModal(true)}/>

                </div>

                {user.isLogged & <div className="login" onClick={dispatch(userSignOut())}>Вийти</div>}
                {!user.isLogged &
                    <div className="login" onClick={setShowSigningForm(true)}>Увійти/Зареєструватись</div>}
            </div>
            {showMapModal &&
                ReactDOM.createPortal(<MapModal
                    defaultLocation={{latitude: weatherData.location.lat, longitude: weatherData.location.lon}}
                    onClose={(data) => {
                        dispatch(changeCoords(data)) //під питанням
                        //setLocation(data)
                        showMapModal(false)
                    }}/>, document.body)}
            {showSigningForm &&
                ReactDOM.createPortal(<SigningForm onClose={setShowSigningForm(false)}/>, document.body)}

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