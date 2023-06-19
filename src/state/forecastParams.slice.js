import {createSlice} from '@reduxjs/toolkit'
import {fetchCurrentWeatherAsync} from "./weather.slice";
import {getDashboard, getUserInfo} from "../DBcalls/DBcalls";

const initialState = {
    isPressure: JSON.parse(localStorage.getItem('isPressure')) || false,
    isWind: false,
    isChanceOfSnow: JSON.parse(localStorage.getItem('isChanceOfSnow')) || false

    /*
    userInfo
    */
    /*latitude: '',
    longitude: '',
    cityName: ''*/
};

export const forecastParamsSlice = createSlice({
    name: 'forecastParams',
    initialState,
    reducers: {
        changeIsPressure: (state) => {
            state.isPressure = !state.isPressure;
        },
        changeIsWind: (state) => {
            state.isWind = !state.isWind;
        },
        changeIsChanceOfSnow: (state) => {
            state.isChanceOfSnow = !state.isChanceOfSnow;
        }

    },

})

// Action creators are generated for each case reducer function
export const {changeIsPressure, changeIsWind, changeIsChanceOfSnow} = forecastParamsSlice.actions

export default forecastParamsSlice.reducer