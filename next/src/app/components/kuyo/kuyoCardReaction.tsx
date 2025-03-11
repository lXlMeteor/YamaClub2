import { Zen_Maru_Gothic } from "next/font/google";
import styles from "@/app/statics/styles/kuyoCardReaction.module.css"

const ZenMaruGothicFont = Zen_Maru_Gothic({
  weight: "900",
  subsets: ["latin"],
});


export default function KuyoCardReaction () {
    return (
        <div className={ `${styles.kuyoCardReaction} ${ZenMaruGothicFont.className}`}>
            <div>
                🤝 12
            </div>
            <div>
                🌱 6
            </div>
            <div>
                😂 11
            </div>
        </div>
    )
}