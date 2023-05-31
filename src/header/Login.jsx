import React, {useEffect, useRef, useState} from 'react';
import {getDashboard, getUserInfo, signIn} from "../DBcalls/DBcalls";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {setDashboard, setUserInfo, userSignIn} from "../state/user.slice";

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
    const [showMessageBox, setShowMessageBox] = useState(false)
    const [message, setMessage] = useState('')
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
            <input type="submit" onClick={async () =>  signIn(login, password).then(response => {
                console.log(response)
                if (response.success) {
                    dispatch(userSignIn({login: login, token: response.token}))

                    getUserInfo(response.token) // Send another request to get user information
                        .then(userInfoResponse => {
                            dispatch(setUserInfo(userInfoResponse)) // Dispatch the user information to the store
                        })
                        .catch(error => {
                            console.log(error)
                            // Handle error if user information retrieval fails
                        })
                    getDashboard(response.token) // Send another request to get user information
                        .then(dashboardResponse => {
                            dispatch(setDashboard(dashboardResponse)) // Dispatch the user information to the store
                        })
                        .catch(error => {
                            console.log(error)
                            // Handle error if user information retrieval fails
                        })


                } else {
                    console.log(response.message)
                    setMessage(response.message)
                    setShowMessageBox(true)
                    //вивести користувачу response.message
                }

            })} value="Увійти"/>
            {showMessageBox &&
                <div>{message}</div>}
        </div>

    );
};

export default Login;
/*{async () =>  signIn(login, password).then(response => {
                console.log(response)
                if (response.status === 200) {
                    dispatch(userSignIn(login))
                } else {
                    console.log(response.message)
                    //вивести користувачу response.message
                }

            })}*/