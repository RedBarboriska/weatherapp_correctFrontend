import React, {useState} from 'react';
//import WeatherWidget from "./app/feature/WeatherWidget/WeatherWidget";
//import Button from "./app/components/Button";
import styled from "styled-components";
// @ts-ignore
//import {ReactComponent as PlusIcon} from './icons/plus.svg';
//import Header from "./header/Header";
//import MiniWeatherWidget from "./MiniWeatherWidget/MiniWeatherWidget";
import {useSelector} from "react-redux";
import WeatherWidget from "./WeatherWidget/WeatherWidget";

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
    const isLogged = useSelector((state) => state.user.isLogged)

    return (
        <AppWrapper>
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