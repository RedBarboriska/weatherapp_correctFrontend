import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
//import {RootState} from "@reduxjs/toolkit/dist/query/core/apiState";

import {userSlice} from "./user.slice";
import {getWeatherData} from "../DBcalls/DBcalls";


const SLICE_KEY = 'weatherMap'

const initialState = {
    value: {},
    isLoading: {},
    error: {}
};

//ACTIONS
export const fetchMapWeatherAsync = createAsyncThunk(
    `${SLICE_KEY}/fetch`,
    ({q,key}) => getWeatherData({q}),//createGETRequest({params: {q}})//,


)

//SLICE
export const weatherMapSlice = createSlice({
    name: SLICE_KEY,
    initialState,
    reducers: {
        removeByProperties: (state, action) => {
           // const keyToRemove = action.payload;
            for (const key in state.value) {
                const obj = state.value[key];
                console.log(obj)
                if (obj.location.name === action.payload.name
                    && obj.location.region === action.payload.region
                    && obj.location.country === action.payload.country) {
                    console.log("YES")
                    delete state.value[key];
                    break; // Якщо ви хочете видалити всі входження, то видаліть цей рядок
                }
            }
            //state.isLoading[keyToRemove]=null
            //.value[keyToRemove]=null
            //delete state.isLoading[keyToRemove];
            //delete state.value[keyToRemove];
            console.log("REMOVE PROPERTIES")
        },
        removeByKey: (state, action) => {
            const keyToRemove = action.payload;
            //state.isLoading[keyToRemove]=null
            //.value[keyToRemove]=null
            delete state.isLoading[keyToRemove];
            delete state.value[keyToRemove];
            console.log("REMOVE ITEM")
        },
        removeAll: (state) => {

            //state.isLoading[keyToRemove]=null
            //.value[keyToRemove]=null
            state.isLoading={};
            state.value={};
        }
        },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMapWeatherAsync.pending, (state, action) => {
                if (!state.value[action.meta.arg.key]) {
                    state.isLoading[action.meta.arg.key] = true;
                }
            })
            .addCase(fetchMapWeatherAsync.fulfilled, (state, action) => {
                console.log(action.payload)
                state.value[action.meta.arg.key] = action.payload
                state.isLoading[action.meta.arg.key] = false;
                console.log("ЗАНЕСЛИ В СТОР")

            })
            .addCase(fetchMapWeatherAsync.rejected, (state, action) => {
                state.isLoading[action.meta.arg.key] = false;
                // @ts-ignore
                console.log("ПОМИЛКА")
                state.error[action.meta.arg.key] = action.error.status
            });
    },
});

//SELECTORS
export const isLoadingMapSelector = (state, q) => state.weatherMap.isLoading[q];
export const weatherDataMapSelector = (state, q) => state.weatherMap.value[q]
export const weatherErrorMapSelector = (state, q) => state.weatherMap.error[q]
export const {removeByKey,removeAll,removeByProperties} = weatherMapSlice.actions

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
