'use client'
import { LogOutButton, NotLogOutButton } from "../components/logOut/logOutButtons";

export default function LogOut () {
    return (
        <div>
            ログアウトページ
            <h1>ログアウトしますか？</h1>
            <NotLogOutButton />
            <LogOutButton />
        </div>
    )
}