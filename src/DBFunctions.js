import axios from "axios";
import React, {useEffect, useRef, useState} from 'react';
//import {setIsLogged, setLoginData} from "./App";

export const signIn = async (login, password) => {
    axios.post('http://localhost:5000/login', {login, password})
        .then(response => {
            console.log(response.data);
            if (response.data != null) {
                // setLoginData(response.data)
                // setIsLogged(true)
                //console.log(isLogged)
            }
        })
        .catch(error => {
            console.error(error);
        });

}

export const signUp = async (login, password, name) => {
    axios.post('http://localhost:5000/sign-up', {login, password, name})
        .then(response => {
            console.log(response.data);
            //null
        })
        .catch(error => {
            console.error(error);
        });
}

export const getDashboard = async (login, password, name) => {
    axios.post('http://localhost:5000/sign-up', {login, password, name})
        .then(response => {
            console.log(response.data);
            //null
        })
        .catch(error => {
            console.error(error);
        });
}