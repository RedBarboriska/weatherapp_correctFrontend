import React, {useEffect, useRef, useState} from 'react';
import {signIn} from "./DBFunctions";
import styled from "styled-components";

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

const Login = (onClick) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    return (

        <div>
            <div><label htmlFor="uname"><b>Логін: </b></label>
                <input type="text" placeholder="Введіть логін" name="uname" value={login}
                       onChange={(e) => setLogin(e.target.value)} required/>

            </div>
            <div>
                <label htmlFor="psw"><b>Пароль: </b></label>
                <input type="password" placeholder="Введіть пароль" name="psw" value={password}
                       onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <input type="submit" onClick={async () => await signIn(login, password)} value="Увійти"/>

        </div>

    );
};

//export default Login;
