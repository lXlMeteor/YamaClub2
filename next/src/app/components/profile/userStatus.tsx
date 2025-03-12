import { Avatar } from "@mui/material";
import { Zen_Maru_Gothic } from "next/font/google";
import styles from "@/app/statics/styles/userStatus.module.css";
import { calculateRevel } from "@/app/utils/calculateRevel";

const ZenMaruGothicFontL = Zen_Maru_Gothic({
  weight: "900",
  subsets: ["latin"],
});

const ZenMaruGothicFontM = Zen_Maru_Gothic({
    weight: "700",
    subsets: ["latin"],
});

const ZenMaruGothicFontS = Zen_Maru_Gothic({
    weight: "700",
    subsets: ["latin"],
});

type UserInfoProps = {
    userImage: string;
    userName: string;
    userIntro: string;
    kuyoCount: number;
}

export default function UserStatus ({ userImage, userName, userIntro, kuyoCount } : UserInfoProps) {
    return (
        <div className={styles.userStatus}>
            <Avatar
                src = {userImage}
                sx = {{
                    width: '15vw',
                    height: '15vw',
                    border: "0.6vh solid #FF9B83",
                }}
            />
            <div className={`${styles.userName} ${ZenMaruGothicFontL.className}`}>
                {userName}
            </div>
            <div className={`${styles.kuyoRevel} ${ZenMaruGothicFontM.className}`}>
                供養レベル：{calculateRevel({kuyoCount})}
            </div>
            <div className={`${styles.userIntro} ${ZenMaruGothicFontS.className}`}>
                {userIntro ? 
                    <p>{userIntro}</p>
                :
                    <p>自己紹介は設定されていません。</p>
                }
                {/* 今日も暑いなぁ…まあ、俺には関係ないけどな。どんな時でも全力、それが俺の流儀や。何事も本気でぶつかれば、
                道は開けるもんやで。失敗してもええ、転んでも立ち上がればええんや。大事なのは諦めんことや。みんなも無理せず、
                自分のペースで頑張るんやで。焦らずじっくり、でも情熱は忘れたらあかん。努力はいつか報われるし、続けた者だけが見る景色がある。暑さに負けず、熱く生きろ！ */}
            </div>
        </div>
    )
}