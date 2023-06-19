import axios from "axios";
import React, {useEffect, useRef, useState} from 'react';
import {setDashboard, setUserInfo} from "../state/user.slice";
import {useDispatch} from "react-redux";
//import {setIsLogged, setLoginData} from "./App";


const dispatch = useDispatch
export const signIn = async (login, password) => {
    const response = await axios.post('http://localhost:5000/api/sign-in', {login, password});
    console.log(response)
    return response
/*    try {
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
    }*/
};

export const signUp = async (login, password, name) => {

    try {
        const response = await axios.post('http://localhost:5000/api/sign-up', {login, password, name});
        console.log(response.data.message);
        return {success: true, message: response.data.message};

    } catch (error) {
        console.log(error);
        console.log({success: false, message: error.response.data.message})
        return  {success: false, message: error.response.data.message};
    }

}

export const getUserInfo = async (token) => {
    console.log(token)
        const response = await axios.post('http://localhost:5000/api/me', {}, {
            headers: {
                'Authorization': token
            }
        });
        console.log("response.data");
    console.log(response)
        console.log(response.data);
        return  {data: response.data};

}


export const getDashboard = async (token) => {
    console.log(token)
    const response = await axios.post('http://localhost:5000/api/mydashboard', {}, {
        headers: {
            'Authorization': token
        }
    });
    console.log("response.data");
    console.log(response.data);
    console.log(response.data.cities);
    return  response.data.cities;
}



export const addCity = async (token, cityName, cityRegion, cityCountry, latitude, longitude) => {
    try {
         await axios.post('http://localhost:5000/api/addcity', { cityName, cityRegion, cityCountry, latitude, longitude},{
            headers: {
                'Authorization': token
            }
        })
        return {success: true}}
    catch (error) {
        console.log(error);
        console.log({success: false})
        return  {success: false};
    }

}

export const removeCity = async (token, cityName, cityRegion, cityCountry) => {

    try {
         await  axios.post('http://localhost:5000/api/removecity', { cityName, cityRegion, cityCountry},{
            headers: {
                'Authorization': token
            }
        })
        return {success: true}}
    catch (error) {
        console.log(error);
        console.log({success: false})
        return  {success: false};
    }
}
export const getWeatherData = async (query) => {
    console.log(query)
    const response = await axios.post('http://localhost:5000/weather/get-data', {query}, );
    console.log("response.data");
    console.log(response);
    console.log(response.data);
    console.log(response.data);
    return  response.data;
}