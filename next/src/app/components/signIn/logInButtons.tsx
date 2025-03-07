import { Button } from "@mui/material";
import { signIn } from "next-auth/react";


type LoginButtonProps = {
    setIsBlank: React.Dispatch<React.SetStateAction<boolean>>;
    setAuthSwitch: React.Dispatch<React.SetStateAction<boolean>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    setPassWord: React.Dispatch<React.SetStateAction<string>>;
}

export function LogInButton ({ setIsBlank, setAuthSwitch, setEmail, setUserName, setPassWord } : LoginButtonProps) {

    const handleClick = () => {
        setIsBlank(false);
        setAuthSwitch(false);
        setEmail("");
        setUserName("");
        setPassWord("");
        console.log("ログインを選択中。");
    }

    return (
        <Button
            variant="contained"
            onClick={handleClick}
            sx={{
                width: '50%',
                height: '8vh',
                borderRadius: '25px 0 0 0',
                backgroundColor: 'rgba(255, 155, 131, 0.04)',
                color: '#FF9B83',
                fontWeight: 'bold',
                fontSize: '2vh', 
                border: '2px solid #EF6C00',
                '&:hover': {
                    backgroundColor: 'rgba(224, 129, 109, 0.2)',
                    },
                }}
            >
            ログイン
        </Button>
    )
}


type LogInPostButton = {
    setIsBlank: React.Dispatch<React.SetStateAction<boolean>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    passWord: string;
    setPassWord: React.Dispatch<React.SetStateAction<string>>;
}

export function LogInPostButton ({ setIsBlank, email, setEmail, passWord, setPassWord } : LogInPostButton) {

    const handleClick = async() => {
        if (email && passWord) {
            setIsBlank(false);
            console.log("送信：ログイン開始");
            console.log(`メールアドレス：${email}`);
            console.log(`パスワード：${passWord}`);
            setEmail("");
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

    return (
        <Button
            variant="contained"
            onClick={handleClick}
            sx={{
                width: '13vh',
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
