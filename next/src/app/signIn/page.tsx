'use client'

import styles from '@/app/statics/styles/signIn.module.css';
import EmailField from '../components/signIn/emailField';
import PassField from '../components/signIn/passField';
import { LoginButton, SignUpButton } from '../components/signIn/signInButtons';
import { useState } from 'react';

export default function SignIn () {

    const [email, setEmail] = useState<string>("");
    const [passWord, setPassWord] = useState<string>("");

    return (
        <div className={styles.signIn}>
            <EmailField
                email = {email}
                setEmail = {setEmail}
            />
            <PassField
                passWord = {passWord}
                setPassWord = {setPassWord}
            />
            <LoginButton
                email = {email}
                setEmail = {setEmail}
                passWord = {passWord}
                setPassWord = {setPassWord}
            />
            <SignUpButton
                email = {email}
                setEmail = {setEmail}
                passWord = {passWord}
                setPassWord = {setPassWord}
            />
        </div>
    )
}