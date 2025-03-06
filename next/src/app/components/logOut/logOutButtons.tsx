import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export function LogOutButton () {
    
    const handleClick = () => {
        console.log("ログアウトしました。");
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
            はい
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
            いいえ
        </Button>
    )
}