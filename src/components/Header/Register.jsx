import React, {useEffect, useRef, useState} from 'react';
import {signIn, signUp} from "../../DBcalls/DBcalls";
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

const Register = () => {
    const [login, setLogin] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [showMessageBox, setShowMessageBox] = useState(false)
    const [message, setMessage] = useState('')

    return (

        <div>
            <div><label htmlFor="uname"><b>Ім'я: </b></label>
                <input type="text" placeholder="Введіть Ваше ім'я" name="uname" value={name}
                       onChange={(e) => setName(e.target.value)} required/>
            </div>
            <div><label htmlFor="uname"><b>Логін: </b></label>
                <input type="text" placeholder="Введіть логін" name="uname" value={login}
                       onChange={(e) => setLogin(e.target.value)} required/>
            </div>

            <div>
                <label htmlFor="psw"><b>Пароль: </b></label>
                <input type="password" placeholder="Введіть пароль" name="psw" value={password}
                       onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <input type="submit" onClick={async () =>await signUp(login, password, name).then(response => {
                console.log(response)
                setMessage(response.message)
                setShowMessageBox(true)
            })

            } value="Зареєструватися"/>
            {showMessageBox &&
                <div>{message}</div>}
        </div>

    );
};

export default Register;
