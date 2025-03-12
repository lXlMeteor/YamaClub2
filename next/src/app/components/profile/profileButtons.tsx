import { Button } from "@mui/material";
import { calculateRevel } from "@/app/utils/calculateRevel";
import { Zen_Maru_Gothic } from "next/font/google";

const ZenMaruGothicFont = Zen_Maru_Gothic({
  weight: "900",
  subsets: ["latin"],
});

type PastPostButton = {
    switchProfile: boolean;
    setSwitchProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

export function PastPostButton ({ switchProfile, setSwitchProfile } : PastPostButton) {

    const handleClick = () => {
        setSwitchProfile(true)
    }

    return (
        <Button
            onClick={handleClick}
            sx = {{
                fontSize: "1.5vw",
                color: switchProfile ? "#71BFFF" : "#FF9B83",
                borderRadius: "50px"

            }}
        >
            <div className={ZenMaruGothicFont.className}>
                過去の投稿
            </div>
        </Button>
    )
}


type KuyoRevelProps = {
    switchProfile: boolean;
    setSwitchProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

export function KuyoRevelButton ({ switchProfile, setSwitchProfile } : KuyoRevelProps) {

    const handleClick = () => {
        setSwitchProfile(false)
    }
    return (
        <Button
            onClick={handleClick}
            sx={{
                fontSize: "1.5vw",
                color: switchProfile ? "#FF9B83" : "#71BFFF",
                borderRadius: "50px",
                padding: "8px 16px", // ボタンのパディングを追加（必要に応じて調整）
            }}
        >
            <div className={ZenMaruGothicFont.className}>
                供養レベル
            </div>
        </Button>
    );

}