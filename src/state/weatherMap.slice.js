import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
//import {RootState} from "@reduxjs/toolkit/dist/query/core/apiState";
import {getWeatherData} from "../utils/api";
import {userSlice} from "./user.slice";


const SLICE_KEY = 'weatherMap'

const initialState = {
    value: {},
    isLoading: {},
    error: {}
};

//ACTIONS
export const fetchMapWeatherAsync = createAsyncThunk(
    `${SLICE_KEY}/fetch`,
    ({q}) => getWeatherData({q}),//createGETRequest({params: {q}})//,


)

//SLICE
export const weatherMapSlice = createSlice({
    name: SLICE_KEY,
    initialState,
    reducers: {
        removeByKey: (state, action) => {
            const keyToRemove = action.payload;
            //state.isLoading[keyToRemove]=null
            //.value[keyToRemove]=null
            delete state.isLoading[keyToRemove];
            delete state.value[keyToRemove];
        }
        },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMapWeatherAsync.pending, (state, action) => {
                if (!state.value[action.meta.arg.q]) {
                    state.isLoading[action.meta.arg.q] = true;
                }
            })
            .addCase(fetchMapWeatherAsync.fulfilled, (state, action) => {
                console.log(action.payload)
                state.value[action.meta.arg.q] = action.payload
                state.isLoading[action.meta.arg.q] = false;
                console.log("ЗАНЕСЛИ В СТОР")

            })
            .addCase(fetchMapWeatherAsync.rejected, (state, action) => {
                state.isLoading[action.meta.arg.q] = false;
                // @ts-ignore
                console.log("ПОМИЛКА")
                state.error[action.meta.arg.q] = action.error.status
            });
    },
});

//SELECTORS
export const isLoadingMapSelector = (state, q) => state.weatherMap.isLoading[q];
export const weatherDataMapSelector = (state, q) => state.weatherMap.value[q]
export const weatherErrorMapSelector = (state, q) => state.weatherMap.error[q]
export const {removeByKey} = weatherMapSlice.actions

export default weatherMapSlice.reducer;

/*
  reducers: {
        addWeather: (state, action) => {
            console.log(action)
            state.value[action.meta.arg.q] = action.payload
            state.error[action.meta.arg.q] = action.error.status
        },
        removeWeather: (state, action) => {
            console.log(action)
            state.value[action.meta.arg.q] = action.payload
            state.error[action.meta.arg.q] = action.error.status
        }

    },
*/
