import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { Zen_Maru_Gothic } from "next/font/google";

const ZenMaruGothicFont = Zen_Maru_Gothic({
  weight: "900",
  subsets: ["latin"],
});

export function LogOutButton () {
    
    const handleClick = () => {
        console.log("ログアウトしました。");
    }

    return (
        <Button
            variant="contained"
            onClick={handleClick}
            sx={{
                width: '11vw',
                height: '6vh',
                borderRadius: '10px',
                backgroundColor: '#FF9B83',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '2.3vw', 
                '&:hover': {
                    backgroundColor: '#E0816D',
                },
            }}
        >
            <div className={ZenMaruGothicFont.className}>
                はい
            </div>
        </Button>
    )
}

export function NotLogOutButton () {

    const router = useRouter();

    const handleClick = () => {
        router.push("/top");
    }

    return (
        <Button
            variant="contained"
            onClick={handleClick}
            sx={{
                width: '11vw',
                height: '6vh',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                color: '#FF9B83',
                fontWeight: 'bold',
                fontSize: '2.3vw',
                border: '0.2vw solid #EF6C00',
                '&:hover': {
                    backgroundColor: 'rgba(224, 129, 109, 0.2)',
                    },
                }}
        >
            <div className={ZenMaruGothicFont.className}>
                いいえ
            </div>
        </Button>
    )
}