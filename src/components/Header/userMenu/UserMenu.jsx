import MapViewer from "../searchTools/Map/MapViewer";
import React, {useState} from "react";
import user_icon from "../../../img/user_icon.png";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {weatherDataSelector} from "../../../state/weather.slice";
import {getDataKey} from "../../WeatherWidget/weatherWidget.helpers";
import {userSignOut} from "../../../state/user.slice";
import {removeAll} from "../../../state/weatherMap.slice";
import './userMenu.css';
import FadeMenu from "./FadeMenu";

const UserMenu = () => {
    function showLogout() {
        let logoutDiv = document.getElementById("logoutDiv");
        logoutDiv.style.display = "block";
    }

    function hideLogout() {
        let logoutDiv = document.getElementById("logoutDiv");
        logoutDiv.style.display = "none";
    }

    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    return (

        <div  className={"dropdown"}>

            <div className="userNameCont" onMouseOver={showLogout}>
                <img alt="user.icon" src={user_icon} style={{width: "20px"}}/>
                <div>{user.userInfo.name}</div>
            </div>

            <div  onMouseOut={hideLogout} className="logout" id="logoutDiv" onClick={() => {
                dispatch(userSignOut())
                localStorage.removeItem('token');
                dispatch(removeAll())
            }}>Вийти
            </div>
        </div>


    )
};

export default UserMenu;