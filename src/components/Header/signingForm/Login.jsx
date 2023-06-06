import React, {useCallback, useEffect, useRef, useState} from 'react';
import {getDashboard, getUserInfo, signIn} from "../../../DBcalls/DBcalls";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchUserDashboardAsync,
    fetchUserSignInAsync,
    setDashboard,
    setUserInfo,
    userSignIn
} from "../../../state/user.slice";

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

const Login = ({onClose}) => {
    const onCloseHandler = useCallback(() => {
        onClose();
    }, [onClose]);
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
            <input type="submit" onClick={async () => dispatch(fetchUserSignInAsync({
                login: login,
                password: password
            })).then(response => {
                console.log("LOGIN response")
                console.log(response)
                console.log(user.error)
                if (response?.payload?.data?.token) {
                    onCloseHandler()
                }


                /*if (response.success) {
                    dispatch(userSignIn({ token: response.token}))
                    getUserInfo(response.token)
                        .then(userInfoResponse => {
                            dispatch(setUserInfo(userInfoResponse))
                        })
                        .catch(error => {
                            console.log(error)

                        })
                    getDashboard(response.token)
                        .then(dashboardResponse => {
                            console.log("dashboardResponse")
                            console.log(dashboardResponse)
                            dispatch(setDashboard(dashboardResponse))
                        })
                        .catch(error => {
                            console.log(error)

                        })


                } else {
                    console.log(response.message)
                    setMessage(response.message)
                    setShowMessageBox(true)
                    //вивести користувачу response.message
                }*/

            })} value="Увійти"/>
            {user.error &&
                <div>{user.error}</div>}
            {/*{user.error &&
                <div>{user.error}</div>}*/}
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