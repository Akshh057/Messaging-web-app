import React from 'react'
import './login.css';
import { Button } from '@material-ui/core';
import ForumTwoToneIcon from '@material-ui/icons/ForumTwoTone';
import { auth, provider } from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {
    const [{ }, dispatch] = useStateValue();
    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
            })
            .catch((error) => alert(error.message));
    }
    return (
        <div className="login">
            <div className="login__container">
                <ForumTwoToneIcon />
                <div className="login__text">
                    <h1>
                        Room Messenger
                    </h1>
                </div>
                <Button type="submit" onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    );
}

export default Login
