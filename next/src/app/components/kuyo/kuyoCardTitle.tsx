import styles from "@/app/statics/styles/kuyoCardTitle.module.css"
import { Zen_Maru_Gothic } from "next/font/google";

const ZenMaruGothicFont = Zen_Maru_Gothic({
  weight: "900",
  subsets: ["latin"],
});

type KuyoCardTitleProps = {
    title: string;
}

export default function KuyoCardTitle ({ title } : KuyoCardTitleProps) {
    return (
        <div className={ `${styles.kuyoCardTitle} ${ZenMaruGothicFont.className}`}>
            {title}
        </div>
    )
}