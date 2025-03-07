import { Button } from "@mui/material";
import { signIn } from 'next-auth/react';

type SignUpButtonProps = {
    setIsBlank: React.Dispatch<React.SetStateAction<boolean>>;
    setAuthSwitch: React.Dispatch<React.SetStateAction<boolean>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    setPassWord: React.Dispatch<React.SetStateAction<string>>;
}

export function SignUpButton ({ setIsBlank, setAuthSwitch, setEmail, setUserName, setPassWord } : SignUpButtonProps) {

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
                borderRadius: '0 25px 0 0',
                backgroundColor: '#FF9B83',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '2vh', 
                '&:hover': {
                    backgroundColor: '#E0816D',
                },
            }}
        >
            サインアップ
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

    const handleLogin = async() => {
        if (email && passWord) {
            setIsBlank(false);
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
            } else {
                console.log("ログイン失敗");
            }
        } else {
            setIsBlank(true);
        }
    }
    
    const handleClick = async() => {
        console.log("送信：サインアップ開始");
        console.log(`メールアドレス：${email}`);
        console.log(`ユーザー名：${userName}`);
        console.log(`パスワード：${passWord}`);

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
    }

    return (
        <Button
            variant="contained"
            onClick={handleClick}
            sx={{
                width: '13vw',
                height: '7vh',
                borderRadius: '10px',
                backgroundColor: '#FF9B83',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '2vh', 
                '&:hover': {
                    backgroundColor: 'rgba(224, 129, 109, 0.2)',
                    },
                }}
            >
            確定
        </Button>
    )
}
