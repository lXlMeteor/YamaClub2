'use client'

import styles from '@/app/statics/styles/signIn.module.css';
import { SignInPostButton, SignUpButton } from '../components/signIn/signUpButtons';

import { useState } from 'react';
import SignUpPanel from '../components/signIn/signUpPanel';
import LogInPanel from '../components/signIn/logInPanel';
import { LogInButton, LogInPostButton } from '../components/signIn/loginButtons';

export default function SignIn () {
    const [authSwitch, setAuthSwitch] = useState<boolean>(true);
    const [email, setEmail] = useState<string>("");
    const [passWord, setPassWord] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [isBlank, setIsBlank] = useState<boolean>(false);


    return (
        <div className={styles.signIn}>
            <div className={styles.panel}>
                <div className={styles.switchButton}>
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
                </div>
                { authSwitch ? 
                    <div className={styles.signUpPanel}>
                        <SignUpPanel
                            isBlank = {isBlank}
                            email = {email}
                            setEmail = {setEmail}
                            userName = {userName}
                            setUserName = {setUserName}
                            passWord = {passWord}
                            setPassWord = {setPassWord}
                        />
                        <div className={styles.signInPostButton}>
                            <SignInPostButton
                                setIsBlank = {setIsBlank}
                                email = {email}
                                setEmail = {setEmail}
                                userName = {userName}
                                setUserName = {setUserName}
                                passWord = {passWord}
                                setPassWord = {setPassWord}
                            />
                        </div>
                    </div>
                :
                    <div className={styles.signUpPanel}>
                        <LogInPanel
                            isBlank = {isBlank}
                            email = {email}
                            setEmail = {setEmail}
                            passWord = {passWord}
                            setPassWord = {setPassWord}
                        />
                        <div className={styles.signInPostButton}>
                            <LogInPostButton
                                setIsBlank = {setIsBlank}
                                email = {email}
                                setEmail = {setEmail}
                                passWord = {passWord}
                                setPassWord = {setPassWord}
                            />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}