import styles from "@/app/statics/styles/kuyoCardTitle.module.css"
import { Zen_Maru_Gothic } from "next/font/google";

const ZenMaruGothicFont = Zen_Maru_Gothic({
  weight: "900",
  subsets: ["latin"],
});

export default function KuyoCardTitle () {
    return (
        <div className={ `${styles.kuyoCardTitle} ${ZenMaruGothicFont.className}`}>
            高校生の頃に好きな人にLINEを送った話
        </div>
    )
}