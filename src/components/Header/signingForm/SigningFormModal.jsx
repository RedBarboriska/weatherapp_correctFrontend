import React, {useCallback, useEffect, useRef, useState} from 'react';
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
const SigningFormLook = styled.div`
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
const ModalBackground = styled.div`
  background: #525b72;
  opacity: 0.7;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1
`

const ModalWrapper = styled.div`
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


const SigningFormModal = ({onClose}) => {
    const [showLogin, setShowLogin] = useState(true)
    const [showRegister, setShowRegister] = useState(false)
    /* const onCloseHandler = useCallback(() => {
         // onClose(selectedPoint);
     });*/
    const onCloseHandler = useCallback(() => {
        onClose();
    }, [onClose]);
    return (
        <><ModalWrapper>
            <SigningFormLook>
                {showLogin && <>
                    <Login onClose={onClose}/>
                    <input type="submit" onClick={() => {
                        setShowRegister(true);
                        setShowLogin(false);
                    }} value="Не маєте акаунту? Створити"/>
                </>}
                {showRegister && <>
                    <Register/>
                    <input type="submit" onClick={() => {
                        setShowRegister(false);
                        setShowLogin(true);
                    }} value="Маєте акаунт? Увійти"/>
                </>}
                <input type='submit' onClick={onCloseHandler} value="Відмінити"/>
            </SigningFormLook>
            <ModalBackground/>
        </ModalWrapper>
        </>
    );
};
//onClick={onCloseHandler}
export default SigningFormModal;
