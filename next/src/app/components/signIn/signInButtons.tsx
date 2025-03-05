import { Button } from "@mui/material";

type SignUpButtonProps = {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    passWord: string;
    setPassWord: React.Dispatch<React.SetStateAction<string>>;
}

export function SignUpButton ({ email, setEmail, passWord, setPassWord } : SignUpButtonProps) {

    const handleClick = () => {
        console.log("サインアップしました。")
        console.log(`メールアドレス：${email}`);
        console.log(`パスワード：${passWord}`);
        setEmail("");
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
                    backgroundColor: '#E0816D',
                },
            }}
        >
            サインアップ
        </Button>
    )
}


type LogInButtonProps = {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    passWord: string;
    setPassWord: React.Dispatch<React.SetStateAction<string>>;
}

export function LoginButton ({ email, setEmail, passWord, setPassWord } : LogInButtonProps) {

    const handleClick = () => {
        console.log("ログインしました。");
        console.log(`メールアドレス：${email}`);
        console.log(`パスワード：${passWord}`);
        setEmail("");
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