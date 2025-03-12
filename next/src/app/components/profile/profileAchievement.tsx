import styles from '@/app/statics/styles/profileAchievement.module.css';
import { calculateNextLevel } from '@/app/utils/calculateNextRevel';
import { Zen_Maru_Gothic } from "next/font/google";

const ZenMaruGothicFont = Zen_Maru_Gothic({
    weight: "700",
    subsets: ["latin"],
});

type ProfileAchievementProps = {
    kuyo: number;
    empathy: number;
    lol: number;
    bigLol: number;
}

export default function ProfileAchievement ({ kuyo, empathy, lol, bigLol} : ProfileAchievementProps) {
    return (
        <div className={`${styles.profileAhievement} ${ZenMaruGothicFont.className}`}>
            <div className={styles.achievementBG}>
                <div className={styles.countElement}>
                    <p>現在の供養数：</p>
                    <p>{kuyo}</p>
                </div>
                <br/>
                <div className={styles.countElement}>
                    <p>総獲得🤝数：</p>
                    <p>{empathy}</p>
                </div>
                <br/>
                <div className={styles.countElement}>
                    <p>総獲得🌱数：</p>
                    <p>{lol}</p>
                </div>
                <br/>
                <div className={styles.countElement}>
                    <p>総獲得😂数：</p>
                    <p>{bigLol}</p>
                </div>
                <br/>
                <div className={styles.countElement}>
                    <p>次のレベルまであと：</p>
                    <p>{calculateNextLevel({kuyoCount: kuyo})}</p>
                </div>
            </div>
        </div>
    )
}