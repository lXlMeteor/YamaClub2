import { Button } from "@mui/material";
import { signIn } from "next-auth/react";
import { Zen_Maru_Gothic } from "next/font/google";

const ZenMaruGothicFont = Zen_Maru_Gothic({
  weight: "700",
  subsets: ["latin"],
});


type LoginButtonProps = {
    setIsBlank: React.Dispatch<React.SetStateAction<boolean>>;
    authSwitch: boolean;
    setAuthSwitch: React.Dispatch<React.SetStateAction<boolean>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    setPassWord: React.Dispatch<React.SetStateAction<string>>;
}

export function LogInButton ({ setIsBlank, authSwitch, setAuthSwitch, setEmail, setUserName, setPassWord } : LoginButtonProps) {

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
                borderRadius: '20px 0 0 0',
                backgroundColor: authSwitch ? 'rgba(255, 155, 131, 0.04)' : 'rgba(255, 155, 131, 0.6)',
                borderBottom: '10px solid #FF9B83',
                borderRight: '5px solid #FF9B83',
                color: authSwitch ? '#FF9B83' : '#FFFFFF',
                fontSize: '3.3vh',
                letterSpacing: '-0.5px',
                boxShadow: 'none',
                WebkitTextStroke: authSwitch ? 'none' : '1px #FF9B83',
                '&:hover': {
                    backgroundColor: 'rgba(224, 129, 109, 0.2)',
                    boxShadow: 'none',
                },
            }}
        >
            <div className={`${ZenMaruGothicFont.className}`}>
                ログイン
            </div>
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
                width: '11vw',
                height: '7vh',
                borderRadius: '10px',
                backgroundColor: '#FF9B83',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '3.3vh',
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
