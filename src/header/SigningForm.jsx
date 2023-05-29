import React, {useEffect, useRef, useState} from 'react';
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

const SigningForm = (onClose) => {
    const [showLogin, setShowLogin] = useState(true)
    const [showRegister, setShowRegister] = useState(false)
    /* const onCloseHandler = useCallback(() => {
         // onClose(selectedPoint);
     });*/
    return (

        <>
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
            <input type='submit' value="OK"/>
        </>

    );
};
//onClick={onCloseHandler}
export default SigningForm;
