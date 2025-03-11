import { Zen_Maru_Gothic } from "next/font/google";
import styles from "@/app/statics/styles/kuyoCardReaction.module.css"

const ZenMaruGothicFont = Zen_Maru_Gothic({
  weight: "900",
  subsets: ["latin"],
});

type KuyoCardReactionProps = {
    reactionCounts: {
        EMPATHY: number;
        LOL: number;
        BIGLOL: number;
    };
}


export default function KuyoCardReaction ({ reactionCounts } : KuyoCardReactionProps) {
    return (
        <div className={ `${styles.kuyoCardReaction} ${ZenMaruGothicFont.className}`}>
            <div>
                🤝 {reactionCounts.EMPATHY}
            </div>
            <div>
                🌱 {reactionCounts.LOL}
            </div>
            <div>
                😂 {reactionCounts.BIGLOL}
            </div>
        </div>
    )
}