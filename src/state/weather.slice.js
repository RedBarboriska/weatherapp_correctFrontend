import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
//import {RootState} from "@reduxjs/toolkit/dist/query/core/apiState";
import {getWeatherData} from "../api";


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

    {
        serializeError: (error) => ({
            ...error.response,
        })
    }
)//[location ]

//SLICE
export const weatherSlice = createSlice({
    name: SLICE_KEY,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentWeatherAsync.pending, (state, action) => {
                if (!state.value[action.meta.arg.q]) {
                    state.isLoading[action.meta.arg.q] = true;
                }
            })
            .addCase(fetchCurrentWeatherAsync.fulfilled, (state, action) => {
console.log(action.payload)
                state.value[action.meta.arg.q] = action.payload
                state.isLoading[action.meta.arg.q] = false;

            })
            .addCase(fetchCurrentWeatherAsync.rejected, (state, action) => {
                state.isLoading[action.meta.arg.q] = false;
                // @ts-ignore
                state.error[action.meta.arg.q] = action.error.status
            });
    },
});

//SELECTORS
export const isLoadingSelector = (state, q) => state.weather.isLoading[q];
export const weatherDataSelector = (state, q) => state.weather.value[q]
export const weatherErrorSelector = (state, q) => state.weather.error[q]

export default weatherSlice.reducer;
