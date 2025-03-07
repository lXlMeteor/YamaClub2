'use client'

import styles from '@/app/statics/styles/signIn.module.css';
import { SignUpPostButton, SignUpButton } from '../components/signIn/signUpButtons';
import { useState } from 'react';
import SignUpPanel from '../components/signIn/signUpPanel';
import LogInPanel from '../components/signIn/logInPanel';
import { LogInButton, LogInPostButton } from '../components/signIn/logInButtons';

export default function SignIn () {
    const [authSwitch, setAuthSwitch] = useState<boolean>(true);
    const [email, setEmail] = useState<string>("");
    const [passWord, setPassWord] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [isBlank, setIsBlank] = useState<boolean>(false);


    return (
        <div className={styles.signIn}>
            <LogInButton
                setIsBlank = {setIsBlank}
                setAuthSwitch = {setAuthSwitch}
                setEmail = {setEmail}
                setUserName = {setUserName}
                setPassWord = {setPassWord}
            />
            <SignUpButton
                setIsBlank = {setIsBlank}
                setAuthSwitch = {setAuthSwitch}
                setEmail = {setEmail}
                setUserName = {setUserName}
                setPassWord = {setPassWord}
            />
            { authSwitch ? 
                <div>
                    <SignUpPanel
                        isBlank = {isBlank}
                        email = {email}
                        setEmail = {setEmail}
                        userName = {userName}
                        setUserName = {setUserName}
                        passWord = {passWord}
                        setPassWord = {setPassWord}
                    />
                    <SignUpPostButton
                        setIsBlank = {setIsBlank}
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
                        isBlank = {isBlank}
                        email = {email}
                        setEmail = {setEmail}
                        passWord = {passWord}
                        setPassWord = {setPassWord}
                    />
                    <LogInPostButton
                        setIsBlank = {setIsBlank}
                        email = {email}
                        setEmail = {setEmail}
                        passWord = {passWord}
                        setPassWord = {setPassWord}
                    />
                </div>
            }
        </div>
    )
}