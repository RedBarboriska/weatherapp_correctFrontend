import {createSlice} from '@reduxjs/toolkit'
import {fetchCurrentWeatherAsync} from "./weather.slice";
import {getDashboard, getUserInfo} from "../DBcalls/DBcalls";

const initialState = {
    isLogged: false,
    userInfo: {},
    dashboardInfo: {}
    /*
    userInfo
    */
    /*latitude: '',
    longitude: '',
    cityName: ''*/
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userSignIn: (state, action) => {
            state.isLogged = true
            state.userInfo = getUserInfo(action)//login
            state.dashboardInfo = getDashboard(action)//login
        },
        userSignOut: (state) => {
            state.isLogged = false
            state.userInfo = {}
            state.dashboardInfo = {}
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload.data
        },
        setDashboard: (state, action) => {
            state.dashboardInfo = action.payload.data
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
export const {userSignIn, userSignOut, setUserInfo, setDashboard} = userSlice.actions

export default userSlice.reducer