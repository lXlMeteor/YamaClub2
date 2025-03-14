import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { Shippori_Mincho } from "next/font/google";

const ShipporiMincho = Shippori_Mincho({
  weight: "800",
  subsets: ["latin"],
});

export function SoundButton() {
    const handleClick = () => {
        const audio = new Audio("/sounds/angelSound.mp3");
        audio.play().catch((error) => console.error("音声の再生に失敗しました:", error));
    };

    return (
        <Button
            onClick={handleClick}
            sx = {{
                // backgroundColor: '#fdd77e',
                color: '#ffffff',
                borderRadius: '25px',
                width: '9vw',
                fontSize: '0.9vw',
            }}
        >
            効果音を再生する
        </Button>
    );
}


export function GoTopButton() {

    const router = useRouter()

    const handleClick = () : void => {
        router.push("/profile");
    }

    return(
        <Button
            variant="contained"
            onClick={handleClick}
            sx={{
                width: '17vw',
                height: '6vh',
                borderRadius: '15px',
                backgroundColor: '#FF9B83',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '1.3vw', 
                '&:hover': {
                    backgroundColor: '#E0816D',
                },
            }}
        >
            <div className={ShipporiMincho.className}>
                プロフィールに戻る→
            </div>
        </Button>
    )
}