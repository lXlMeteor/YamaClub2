'use client'

import styles from '@/app/static/styles/signIn.module.css';
import SignInField from '../components/signIn/signInfield';

export default function SignIn () {
    return (
        <div className={styles.signIn}>
            サインイン画面
            <SignInField />
        </div>
    )
}