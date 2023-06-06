import './header.css';

import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {weatherDataSelector} from "../../state/weather.slice";
import {getDataKey} from "../WeatherWidget/weatherWidget.helpers";
import SigningFormModal from "./signingForm/SigningFormModal";
import ReactDOM from "react-dom";
import {fetchUserInfoAsync, userSignOut} from "../../state/user.slice";
import React, {useEffect, useState} from "react";

import SearchTools from "./searchTools/SearchTools";
import UserMenu from "./userMenu/UserMenu";


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
                ReactDOM.createPortal(<SigningFormModal onClose={() => setShowSigningForm(false)}/>, document.body)}


        </>
    )
}

export default Header;

// <input className="searchButton" type="submit" value="Зарегатись"
//                            onClick={async () => await signUp('user2', '1111', 'Petro')}/>