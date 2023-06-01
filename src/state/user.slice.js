import {createSlice} from '@reduxjs/toolkit'
import {fetchCurrentWeatherAsync} from "./weather.slice";
import {getDashboard, getUserInfo} from "../DBcalls/DBcalls";
import {useEffect} from "react";

const initialState = {
    isLogged: false,
    token: "",
    userInfo: {},//name?
    dashboardInfo: []
};



export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userSignIn: (state, action) => {
            state.isLogged = true
            state.token = action.payload.token
            console.log(action.payload.token)
            localStorage.setItem('isLogged', JSON.stringify(true));
            localStorage.setItem('token', JSON.stringify(action.payload.token));
            //state.userInfo = getUserInfo(action.payload.token)//login
            //state.dashboardInfo = getDashboard(action)//login
        },
        userSignOut: (state) => {
            state.isLogged = false
            localStorage.setItem('isLogged', JSON.stringify(false));
            state.token = ""
            localStorage.setItem('token', JSON.stringify(""));
            state.userInfo = {}
            localStorage.setItem('userInfo', JSON.stringify({}));
            state.dashboardInfo = []
            localStorage.setItem('dashboardInfo', JSON.stringify([]));
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload.data
            localStorage.setItem('userInfo', JSON.stringify(action.payload.data));
        },
        setDashboard: (state, action) => {
            state.dashboardInfo = action.payload.data
            localStorage.setItem('dashboardInfo', JSON.stringify(action.payload.data));
        }
    },
    /* extraReducers: (builder) => { //зв'язатися з дб і отримати дані
         builder
             .addCase(fetchCurrentWeatherAsync.pending, (state, action) => {
                 if (!state.value) {
                     state.isLoading = true;
                 }
             })
             .addCase(fetchCurrentWeatherAsync.fulfilled, (state, action) => {
                 state.isLoading = false;
                 state.value = action.payload.data
             })
             .addCase(fetchCurrentWeatherAsync.rejected, (state, action) => {
                 state.isLoading = false;
                 // @ts-ignore
                 state.error = action.error.status
             });
     },*/
})

// Action creators are generated for each case reducer function
export const {userSignIn, userSignOut, setUserInfo, setDashboard} = userSlice.actions

export default userSlice.reducer