import {createSlice} from '@reduxjs/toolkit'
import {fetchCurrentWeatherAsync} from "./weather.slice";
import {getDashboard, getUserInfo} from "../DBcalls/DBcalls";

const initialState = {
    isPressure: false,
    isWind: false,
    isChanceOfSnow: false

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
            state.isPressure = state.isPressure === false;
        },
        changeIsWind: (state) => {
            state.isWind = state.isWind === false;
        },
        changeIsChanceOfSnow: (state) => {
            state.isChanceOfSnow = state.isChanceOfSnow === false;
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
export const {changeIsPressure, changeIsWind, changeIsChanceOfSnow} = forecastParamsSlice.actions

export default forecastParamsSlice.reducer