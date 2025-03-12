'use client'
import { LogOutButton, NotLogOutButton } from "../components/logOut/logOutButtons";
import styles from '@/app/statics/styles/logOut.module.css'
import { Zen_Maru_Gothic } from "next/font/google";

const ZenMaruGothicFont = Zen_Maru_Gothic({
  weight: "900",
  subsets: ["latin"],
});

export default function LogOut () {
    return (
        <div className={styles.backImage}>
            <div className={styles.logOut}>
                <div className={styles.logOutPanel}>
                    <h1 className={ZenMaruGothicFont.className}>
                        ログアウトしますか？
                    </h1>
                    <div className={styles.buttons}>
                        <NotLogOutButton />
                        <LogOutButton />
                    </div>
                </div>
            </div>
        </div>
    )
}