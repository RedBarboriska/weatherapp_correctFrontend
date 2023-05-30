import React, {useCallback, useEffect, useRef, useState} from 'react';
import {signIn, signUp} from "../DBcalls/DBcalls";
import styled from "styled-components";
import Login from "./Login";
import Register from "./Register";
//import {useCallback} from "@types/react";

const LoginWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const SigningFormWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  background-color: rgba(255, 255, 255, 0.93);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  /*border-radius: 20px;*/
  /*border: 2px solid #3e5ea2;*/
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;


const SigningForm = ({onClose}) => {
    const [showLogin, setShowLogin] = useState(true)
    const [showRegister, setShowRegister] = useState(false)
    /* const onCloseHandler = useCallback(() => {
         // onClose(selectedPoint);
     });*/
    const onCloseHandler = useCallback(() => {
        onClose();
    }, [onClose]);
    return (

        <SigningFormWrapper>
            {showLogin && <>
                <Login/>
                <input type="submit" onClick={() => {
                    setShowRegister(true);
                    setShowLogin(false);
                }} value="Не маєте акаунту? Зареєструватися"/>
            </>}
            {showRegister && <>
                <Register/>
                <input type="submit" onClick={() => {
                    setShowRegister(false);
                    setShowLogin(true);
                }} value="Маєте акаунт? Увійти"/>
            </>}
            <input type='submit' onClick={onCloseHandler} value="Відмінити"/>
        </SigningFormWrapper>

    );
};
//onClick={onCloseHandler}
export default SigningForm;
