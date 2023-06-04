import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
//import {RootState} from "@reduxjs/toolkit/dist/query/core/apiState";
import {getWeatherData} from "../utils/api";


const SLICE_KEY = 'weather'

const initialState = {
    value: {},
    isLoading: {},
    error: {}
};

//ACTIONS
export const fetchCurrentWeatherAsync = createAsyncThunk(
    `${SLICE_KEY}/fetch`,
    ({q}) => getWeatherData({q}),//createGETRequest({params: {q}})//,


)

//SLICE
export const weatherSlice = createSlice({
    name: SLICE_KEY,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentWeatherAsync.pending, (state, action) => {
                if (!state.value) {
                    state.isLoading = true;
                }
            })
            .addCase(fetchCurrentWeatherAsync.fulfilled, (state, action) => {
console.log(action.payload)
                state.value = action.payload
                state.isLoading = false;

            })
            .addCase(fetchCurrentWeatherAsync.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                console.log("ПОМИЛКА")
                state.error = action.error.status
            });
    },
});

//SELECTORS
export const isLoadingSelector = (state, q) => state.weather.isLoading;
export const weatherDataSelector = (state, q) => state.weather.value
export const weatherErrorSelector = (state, q) => state.weather.error

export default weatherSlice.reducer;
