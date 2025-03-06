import { Button } from "@mui/material";

type SignUpButtonProps = {
    setAuthSwitch: React.Dispatch<React.SetStateAction<boolean>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    setPassWord: React.Dispatch<React.SetStateAction<string>>;
}

export function SignUpButton ({ setAuthSwitch, setEmail, setUserName, setPassWord } : SignUpButtonProps) {

    const handleClick = () => {
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
                width: '13rem',
                height: '4rem',
                borderRadius: '10px',
                backgroundColor: '#FF9B83',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '1.2rem', 
                '&:hover': {
                    backgroundColor: '#E0816D',
                },
            }}
        >
            サインアップ
        </Button>
    )
}


type LoginButtonProps = {
    setAuthSwitch: React.Dispatch<React.SetStateAction<boolean>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    setPassWord: React.Dispatch<React.SetStateAction<string>>;
}

export function LoginButton ({ setAuthSwitch, setEmail, setUserName, setPassWord } : LoginButtonProps) {

    const handleClick = () => {
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
                width: '13rem',
                height: '4rem',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 155, 131, 0.04)',
                color: '#FF9B83',
                fontWeight: 'bold',
                fontSize: '1.2rem',
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


type SignInPostButton = {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    userName: string;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    passWord: string;
    setPassWord: React.Dispatch<React.SetStateAction<string>>;
}

export function SignInPostButton ({ email, setEmail, userName, setUserName, passWord, setPassWord } : SignInPostButton) {

    const handleClick = () => {
        console.log("送信");
        console.log(`メールアドレス：${email}`);
        console.log(`ユーザー名：${userName}`);
        console.log(`パスワード：${passWord}`);
        setEmail("");
        setUserName("");
        setPassWord("");
    }

    return (
        <Button
            variant="contained"
            onClick={handleClick}
            sx={{
                width: '13rem',
                height: '4rem',
                borderRadius: '10px',
                backgroundColor: '#FF9B83',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                '&:hover': {
                    backgroundColor: 'rgba(224, 129, 109, 0.2)',
                    },
                }}
            >
            確定
        </Button>
    )
}