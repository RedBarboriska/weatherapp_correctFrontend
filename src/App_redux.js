import React, {useEffect, useState} from 'react';
//import WeatherWidget from "./app/feature/WeatherWidget/WeatherWidget";
//import Button from "./app/components/Button";
import styled from "styled-components";
// @ts-ignore
//import {ReactComponent as PlusIcon} from './icons/plus.svg';
//import Header from "./Header/Header";
//import MiniWeatherWidget from "./MiniWeatherWidget/MiniWeatherWidget";
import {useDispatch, useSelector} from "react-redux";
import WeatherWidget from "./components/WeatherWidget/WeatherWidget";
import Header from "./components/Header/Header";
import MiniWeatherWidget from "./components/MiniWeatherWidget/MiniWeatherWidget";
import {fetchUserDashboardAsync, setToken} from "./state/user.slice";

const AppWrapper = styled.div`
  text-align: center;
  margin-top: 10px;`

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
  margin-top: 10px;`


function App_redux() {

    const [nextId, setNextId] = useState(0)
    const [widgets, setWidgets] = useState([{id: nextId}])
    //const token = useSelector((state) => state.user)
    const myCities = useSelector((state) => state.myCities)
    //localStorage.setItem('isLogged', JSON.stringify(true))
    //const retrievedValue = JSON.parse(localStorage.getItem('key'))
    const dispatch= useDispatch()
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('token'))){
            console.log(JSON.parse(localStorage.getItem('token')))
            dispatch(setToken(JSON.parse(localStorage.getItem('token'))))
            dispatch(fetchUserDashboardAsync({token:JSON.parse(localStorage.getItem('token'))}))
            //localStorage.removeItem('name');
        }
        //console.log(user.token)
    },)


    return (
        <AppWrapper>
            <Header/>
            <MiniWeatherWidget/>

            <WeatherWidget/>





            {/*<Header/>
            <WeatherWidget/>

            <WeatherWidget key={id}/>*/}
           

            {/*{isLogged & <MiniWeatherWidget

            />}*/}


        </AppWrapper>
    );
}

export default App_redux;

/*
            <Button onClick={() => {
                setNextId(nextId + 1)
                setWidgets([...widgets, {id: nextId + 1}])
            }}
                    Icon={() => <PlusIcon width={20}/>}
                    title='Add widget'/>
            <ContentWrapper>
                {widgets.map(({id}) => {
                    return <WeatherWidget key={id}/>
                })}
            </ContentWrapper>
 */