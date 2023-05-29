import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    latitude: '',
    longitude: '',
    cityName: '',
    geolocation: ''
};

export const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        changeCityname: (state, action) => {
            state.cityName = action.payload
            state.latitude = ''
            state.longitude = ''
        },
        changeCoords: (state, action) => {
            state.latitude = action.payload.latitude
            state.longitude = action.payload.longitude
            state.cityName = ''
        },
    },
})

// Action creators are generated for each case reducer function
export const {changeCityname, changeCoords} = locationSlice.actions

export default locationSlice.reducer