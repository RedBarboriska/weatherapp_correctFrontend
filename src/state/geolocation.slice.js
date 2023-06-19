import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    // cityName: '',
    //cityRegion: '',
    // cityCountry: '',
    latitude: '',
    longitude: ''
};

export const geolocationSlice = createSlice({
    name: 'geolocation',
    initialState,
    reducers: {

        setGeolocation: (state, {payload}) => payload,
    },
})

// Action creators are generated for each case reducer function
export const {setGeolocation} = geolocationSlice.actions

export default geolocationSlice.reducer