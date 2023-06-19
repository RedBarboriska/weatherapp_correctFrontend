import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {addCity, getDashboard, getUserInfo, removeCity, signIn} from "../DBcalls/DBcalls";
import {useEffect} from "react";
import {getWeatherData} from "../utils/api";

const SLICE_KEY = 'user'

const initialState = {
    isLogged: false,
    error: "",
    token: "",
    userInfo: {},//name?
    dashboardInfo: []
};

export const fetchUserSignInAsync = createAsyncThunk(
    `${SLICE_KEY}/signIn`,
    ({login, password}) => signIn(login, password),
    {
        serializeError: (error) => ({
            ...error.response,
        })
    }
);
export const fetchUserDashboardAsync = createAsyncThunk(
    `${SLICE_KEY}/getDashboard`,
    ({token}) => getDashboard(token))
export const fetchUserInfoAsync = createAsyncThunk(
    `${SLICE_KEY}/getUserInfo`,
    ({token}) => getUserInfo(token))
/*export const fetchAddCityAsync = createAsyncThunk(
    `${SLICE_KEY}/fetch`,
    ({token}) => addCity({token}))
export const fetchRemoveCityAsync = createAsyncThunk(
    `${SLICE_KEY}/fetch`,
    ({token}) => removeCity({token}))*/


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action) => {
            console.log(action)
            state.token = action.payload
        },
        userSignIn: (state, action) => {
            state.isLogged = true
            state.token = action.payload.token
            console.log(action.payload.token)
            //localStorage.setItem('isLogged', JSON.stringify(true));
            //localStorage.setItem('token', JSON.stringify(action.payload.token));
            //state.userInfo = getUserInfo(action.payload.token)//login
            //state.dashboardInfo = getDashboard(action)//login
        },
        userSignOut: (state) => {
            //state.isLogged = false
           // localStorage.setItem('isLogged', JSON.stringify(false));
            state.token = ""
            //localStorage.setItem('token', JSON.stringify(""));
            state.userInfo = {}
           // localStorage.setItem('userInfo', JSON.stringify({}));
            state.dashboardInfo = []
            //localStorage.setItem('dashboardInfo', JSON.stringify([]));
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload.data
           // localStorage.setItem('userInfo', JSON.stringify(action.payload.data));
        },
        setDashboard: (state, action) => {
            state.dashboardInfo = action.payload.data
           // localStorage.setItem('dashboardInfo', JSON.stringify(action.payload.data));
        }
    },
    extraReducers: (builder) => { //зв'язатися з дб і отримати дані
         builder
             .addCase(fetchUserSignInAsync.fulfilled, (state, action) => {
                 console.log(action)
                 state.token = action.payload.data.token
                 state.error =""
                 localStorage.setItem('token', JSON.stringify(action.payload.data.token));
                 //state.isLogged = true;
             })
             .addCase(fetchUserSignInAsync.rejected, (state, action) => {
                 console.log(action)
                 console.log(action.error)
                 console.log(action.error.data.errors.message)
                 state.error = action.error.data.errors.message
             })
             .addCase(fetchUserInfoAsync.fulfilled, (state, action) => {
                 state.userInfo = action.payload.data;
             })
             .addCase(fetchUserDashboardAsync.fulfilled, (state, action) => {
                 console.log(action)
             state.dashboardInfo = action.payload
             })




         ;
     },
})

// Action creators are generated for each case reducer function
export const {userSignIn, userSignOut, setUserInfo, setDashboard, setToken} = userSlice.actions

export default userSlice.reducer