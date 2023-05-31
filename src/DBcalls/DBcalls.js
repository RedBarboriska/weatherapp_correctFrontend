import axios from "axios";
import React, {useEffect, useRef, useState} from 'react';
import {setDashboard, setUserInfo} from "../state/user.slice";
import {useDispatch} from "react-redux";
//import {setIsLogged, setLoginData} from "./App";


const dispatch = useDispatch
export const signIn = async (login, password) => {
    try {
        const response = await axios.post('http://localhost:5000/api/sign-in', {login, password});
        console.log(response);
        return {success: true, token: response.data.token};
        // setLoginData(response.data);
        // setIsLogged(true);
        // console.log(isLogged);
    } catch (error) {
        console.log(error);
        console.log({success: false, message: error.response.data.errors.message})
        return  {success: false, message: error.response.data.errors.message};
    }
};

export const signUp = async (login, password, name) => {
    axios.post('http://localhost:5000/api/sign-up', {login, password, name})
        .then(response => {
            console.log(response.data);
            //null
        })
        .catch(error => {
            console.error(error);
        });
}

export const getUserInfo = async (token) => {
        const response = await axios.post('http://localhost:5000/api/me', {}, {
            headers: {
                'Authorization': token
            }
        });
        console.log("response.data");
        console.log(response.data);
        return  {data: response.data};
        // setLoginData(response.data);
        // setIsLogged(true);
        // console.log(isLogged);
     /*  axios.post('http://localhost:5000/api/me', {}, {
        headers: {
            'Authorization': token
        }
    })
        .then(response => {
            console.log(response.data);
            /!*if (response.status === 200) {
                dispatch(setUserInfo(response.data))
            }
            //null*!/
        })
        .catch(error => {
            console.error(error);
        });*/
}

/*export const getUserInfo = async (login) => {
    axios.post('http://localhost:5000/api/me', {login})
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                dispatch(setUserInfo(response.data))
            }
            //null
        })
        .catch(error => {
            console.error(error);
        });
}*/

export const getDashboard = async (token) => {
    const response = await axios.post('http://localhost:5000/api/mydashboard', {}, {
        headers: {
            'Authorization': token
        }
    });
    console.log("response.data");
    console.log(response.data);
    return  {data: response.data};
}


/*
export const getDashboard = async (login) => {
    axios.post('http://localhost:5000/api/mydashboard', {login})
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                dispatch(setDashboard(response.data))
            }
            //null
        })
        .catch(error => {
            console.error(error);
        });
}
*/

export const addCity = async (login, cityName, cityRegion, cityCountry, latitude, longitude) => {
    axios.post('http://localhost:5000/api/addcity', {login, cityName, cityRegion, cityCountry, latitude, longitude})
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                getUserInfo(login)
            }
        })
        .catch(error => {
            console.error(error);
        });
}

export const removeCity = async (login, cityName, cityRegion, cityCountry) => {
    axios.post('http://localhost:5000/api/removecity', {login, cityName, cityRegion, cityCountry})
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                getUserInfo(login)
            }
        })
        .catch(error => {
            console.error(error);
        });
}
