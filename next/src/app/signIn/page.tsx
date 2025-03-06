'use client'

import styles from '@/app/statics/styles/signIn.module.css';
import { LoginButton, SignInPostButton, SignUpButton } from '../components/signIn/signUpButtons';
import { useState } from 'react';
import SignUpPanel from '../components/signIn/signUpPanel';
import LogInPanel from '../components/signIn/logInPanel';

export default function SignIn () {

    const [authSwitch, setAuthSwitch] = useState<boolean>(true);
    const [email, setEmail] = useState<string>("");
    const [passWord, setPassWord] = useState<string>("");
    const [userName, setUserName] = useState<string>("");

    return (
        <div className={styles.signIn}>
            <LoginButton
                setAuthSwitch = {setAuthSwitch}
                setEmail = {setEmail}
                setUserName = {setUserName}
                setPassWord = {setPassWord}
            />
            <SignUpButton
                setAuthSwitch = {setAuthSwitch}
                setEmail = {setEmail}
                setUserName = {setUserName}
                setPassWord = {setPassWord}
            />
            { authSwitch ? 
                <div>
                    <SignUpPanel
                        email = {email}
                        setEmail = {setEmail}
                        userName = {userName}
                        setUserName = {setUserName}
                        passWord = {passWord}
                        setPassWord = {setPassWord}
                    />
                </div>
            :
                <div>
                    <LogInPanel
                        email = {email}
                        setEmail = {setEmail}
                        passWord = {passWord}
                        setPassWord = {setPassWord}
                    />
                </div>
            }
            <SignInPostButton
                email = {email}
                setEmail = {setEmail}
                userName = {userName}
                setUserName = {setUserName}
                passWord = {passWord}
                setPassWord = {setPassWord}
            />
        </div>
    )
}