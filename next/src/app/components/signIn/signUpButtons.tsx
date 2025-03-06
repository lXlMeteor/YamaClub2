import { Button } from "@mui/material";

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
    setIsBlank: React.Dispatch<React.SetStateAction<boolean>>;
    setAuthSwitch: React.Dispatch<React.SetStateAction<boolean>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    setPassWord: React.Dispatch<React.SetStateAction<string>>;
}

export function LoginButton ({ setIsBlank, setAuthSwitch, setEmail, setUserName, setPassWord } : LoginButtonProps) {

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
    setIsBlank: React.Dispatch<React.SetStateAction<boolean>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    userName: string;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    passWord: string;
    setPassWord: React.Dispatch<React.SetStateAction<string>>;
}

export function SignInPostButton ({ setIsBlank, email, setEmail, userName, setUserName, passWord, setPassWord } : SignInPostButton) {

    const handleClick = () => {
        if (email && userName && passWord) {
            setIsBlank(false);
            console.log("送信");
            console.log(`メールアドレス：${email}`);
            console.log(`ユーザー名：${userName}`);
            console.log(`パスワード：${passWord}`);
            setEmail("");
            setUserName("");
            setPassWord("");
        } else {
            setIsBlank(true);
        }
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



type LogInPostButton = {
    setIsBlank: React.Dispatch<React.SetStateAction<boolean>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    passWord: string;
    setPassWord: React.Dispatch<React.SetStateAction<string>>;
}

export function LogInPostButton ({ setIsBlank, email, setEmail, passWord, setPassWord } : LogInPostButton) {

    const handleClick = () => {
        if (email && passWord) {
            setIsBlank(false);
            console.log("送信");
            console.log(`メールアドレス：${email}`);
            console.log(`パスワード：${passWord}`);
            setEmail("");
            setPassWord("");
        } else {
            setIsBlank(true);
        }
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