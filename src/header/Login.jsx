import React, {useEffect, useRef, useState} from 'react';
import {signIn} from "../DBcalls/DBcalls";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {userSignIn} from "../state/user.slice";

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

const Login = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
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
            <input type="submit" onClick={async () => await signIn(login, password).then((data) => {
                if (data.status === 200) {
                    dispatch(userSignIn(login))
                } else {

                    //вивести користувачу response.message
                }

            })} value="Увійти"/>

        </div>

    );
};

export default Login;
