import { Zen_Maru_Gothic } from "next/font/google";
import styles from "@/app/statics/styles/loading.module.css";

// Zen Maru Gothicフォントを指定
const ZenMaruGothicFont = Zen_Maru_Gothic({
  weight: "700",
  subsets: ["latin"],
});

export default function Loading() {
    return (
        <div className={styles.loading}>
            {/* フォントクラスを正しく適用 */}
            <h2 className={`${ZenMaruGothicFont.className} ${styles.loadingText}`}>
                読み込み中....
            </h2>
        </div>
    );
}
