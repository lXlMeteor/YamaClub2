import { Button } from "@mui/material";
import styles from "@/app/statics/styles/reactionButtons.module.css";
import { Zen_Maru_Gothic } from "next/font/google";

const ZenMaruGothicFont = Zen_Maru_Gothic({
  weight: "900",
  subsets: ["latin"],
});

type EmpathyButtonProps = {
    EMPATHY: number;
};

export function EmpathyButton ({ EMPATHY } : EmpathyButtonProps) {
    return(
        <Button>
            <div className = {`${styles.reactionButton} ${ZenMaruGothicFont.className}`}>
                共感したよ: 
                <p>
                    🤝 {EMPATHY}
                </p>
            </div>
        </Button>
    )
}



type LolButtonProps = {
    LOL: number;
};

export function LolButton ({ LOL } : LolButtonProps) {
    return(
        <Button>
            <div className = {`${styles.reactionButton} ${ZenMaruGothicFont.className}`}>
                成長したね！:
                <p>
                    🌱 {LOL}
                </p>
            </div>
        </Button>
    )
}



type BigLolButtonProps = {
    BIGLOL: number;
};

export function BigLolButton ({ BIGLOL } : BigLolButtonProps) {
    return(
        <Button>
            <div className={`${styles.reactionButton} ${ZenMaruGothicFont.className}`}>
                まじおもろい:
                <p>
                    😂 { BIGLOL }
                </p>
            </div>
        </Button>
    )
}