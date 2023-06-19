import './header.css';

import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {weatherDataSelector} from "../../state/weather.slice";
import {getDataKey} from "../WeatherWidget/weatherWidget.helpers";
import SigningFormModal from "./signingForm/SigningFormModal";
import ReactDOM from "react-dom";
import {fetchUserInfoAsync, userSignOut} from "../../state/user.slice";
import React, {useEffect, useState} from "react";
import logo from "../../img/logo.png"
import SearchTools from "./searchTools/SearchTools";
import UserMenu from "./userMenu/UserMenu";
import FadeMenu from "./userMenu/FadeMenu";
import minus from "../../img/minus.png";


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


    return (<>
            <div className="App-header">

                <img title="Логотип" src={logo} alt="Логотип" style={{ height: '50px' , padding:"5px"}}/>
                <div className="logo"> {/*<img title="Логотип" src={logo} alt="Логотип" style={{ height: '50px' }}/>*/}{/*Погодниця*/}</div>

                <SearchTools/>


                {user.token &&
                   /* <UserMenu/>*/
                    <FadeMenu/>
                }

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