'use client';

import { Button } from "@mui/material";
import { signIn } from 'next-auth/react';
import { Zen_Maru_Gothic } from "next/font/google";
import { useRouter } from 'next/navigation';

const ZenMaruGothicFont = Zen_Maru_Gothic({
  weight: "700",
  subsets: ["latin"],
});

type SignUpButtonProps = {
    setIsBlank: React.Dispatch<React.SetStateAction<boolean>>;
    authSwitch: boolean;
    setAuthSwitch: React.Dispatch<React.SetStateAction<boolean>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    setPassWord: React.Dispatch<React.SetStateAction<string>>;
}

export function SignUpButton ({ setIsBlank, authSwitch, setAuthSwitch, setEmail, setUserName, setPassWord } : SignUpButtonProps) {

    const handleClick = () => {
        setIsBlank(false);
        setAuthSwitch(true);
        setEmail("");
        setUserName("");
        setPassWord("");
        console.log("サインアップを選択中。");
    }

    return (
        <Button
            variant="contained"
            onClick={handleClick}
            sx={{
                width: '50%',
                height: '8vh',
                borderRadius: '0 20px 0 0',
                backgroundColor: authSwitch ? 'rgba(255, 155, 131, 0.6)' : 'rgba(255, 155, 131, 0.04)',
                borderBottom: '10px solid #FF9B83',
                borderLeft: '5px solid #FF9B83',
                color: authSwitch ? '#FFFFFF' : '#FF9B83',
                fontWeight: '900',
                fontSize: '3.3vh',
                letterSpacing: '-0.5px',
                boxShadow: 'none',
                WebkitTextStroke: authSwitch ? '1px #FF9B83' : 'none',
                '&:hover': {
                    backgroundColor: 'rgba(224, 129, 109, 0.2)',
                    boxShadow: 'none',
                },
            }}
        >
            <div className={`${ZenMaruGothicFont.className}`}>
                サインアップ
            </div>
        </Button>
    )
}


type SignUpPostButton = {
    setIsBlank: React.Dispatch<React.SetStateAction<boolean>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    userName: string;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    passWord: string;
    setPassWord: React.Dispatch<React.SetStateAction<string>>;
}

export function SignUpPostButton ({ setIsBlank, email, setEmail, userName, setUserName, passWord, setPassWord } : SignUpPostButton) {
    const router = useRouter();

    const handleLogin = async() => {
        if (email && userName && passWord) {
            console.log("送信：ログイン開始");
            console.log(`メールアドレス：${email}`);
            console.log(`パスワード：${passWord}`);
            setEmail("");
            setUserName("");
            setPassWord("");

            const responce = await signIn('credentials', {
                email,
                password: passWord,
                redirect: false,
            });
            if (responce?.ok) {
                console.log("ログイン成功");
                router.push("/top");
            } else {
                console.log("ログイン失敗");
            }
        } else {
            setIsBlank(true);
        }
    }
    
    const handleClick = async() => {
        if(email && userName && passWord) {
            console.log("送信：サインアップ開始");
            console.log(`メールアドレス：${email}`);
            console.log(`ユーザー名：${userName}`);
            console.log(`パスワード：${passWord}`);
            setIsBlank(false);

            try {
                const response = await fetch('/api/auth/signUp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userName, email, passWord }),
                });
                const data = await response.json();
                if (response.ok) {
                    console.log(data);
                    handleLogin();
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            setIsBlank(true);
        }
    }

    return (
        <Button
            variant="contained"
            onClick={handleClick}
            sx={{
                width: '10vw',
                height: '5.5vh',
                borderRadius: '10px',
                backgroundColor: '#FF9B83',
                color: '#FFFFFF',
                fontSize: '3vh', 
                '&:hover': {
                    backgroundColor: '#E0816D',
                    },
                }}
            >
            <div className={`${ZenMaruGothicFont.className}`}>
                確定
            </div>
        </Button>
    )
}
