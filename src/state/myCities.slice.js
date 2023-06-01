import {createSlice} from '@reduxjs/toolkit'
import {fetchCurrentWeatherAsync} from "./weather.slice";
import {getDashboard, getUserInfo} from "../DBcalls/DBcalls";

const initialState = {
    isMyCities: false,
};

export const myCitiesSlice = createSlice({
    name: 'myCities',
    initialState,
    reducers: {
        showMyCities: (state) => {
            console.log(state.isMyCities)
            state.isMyCities = true;

        },
        hideMyCities: (state) => {
            state.isMyCities = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const {showMyCities, hideMyCities} = myCitiesSlice.actions

export default myCitiesSlice.reducer