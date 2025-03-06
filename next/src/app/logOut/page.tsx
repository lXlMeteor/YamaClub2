'use client'
import { LogOutButton, NotLogOutButton } from "../components/logOut/logOutButtons";

export default function LogOut () {
    return (
        <div>
            ログアウトページ
            <h1>ログアウトしますか？</h1>
            <p>「はい」を押すと、コンソールに出力。「いいえ」を押すと、/topへ移動。</p>
            <NotLogOutButton />
            <LogOutButton />
        </div>
    )
}