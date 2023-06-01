import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    cityName: "",
    cityRegion:"",
    cityCountry:""
};

export const searchedCitySlice = createSlice({
    name: 'searchedCity',
    initialState,
    reducers: {
        setSearchedCity: (state, action) => {
            state.cityName= action.payload.cityName
            state.cityRegion= action.payload.cityRegion
            state.cityCountry= action.payload.cityCountry

        }
    },
})

// Action creators are generated for each case reducer function
export const {setSearchedCity} = searchedCitySlice.actions

export default searchedCitySlice.reducer