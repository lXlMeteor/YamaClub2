import styles from '@/app/statics/styles/footer.module.css'
import { Zen_Maru_Gothic } from "next/font/google";

const ZenMaruGothicFont = Zen_Maru_Gothic({
  weight: "700",
  subsets: ["latin"],
});

export default function Footer () {
    return (
        <div className={styles.footer}>
            <p className={ZenMaruGothicFont.className}>
                ©山岳部２
            </p>
        </div>
    )
}