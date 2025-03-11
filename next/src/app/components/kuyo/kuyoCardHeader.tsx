import styles from "@/app/statics/styles/kuyoCardHeader.module.css";
import { Avatar } from "@mui/material";
import { Zen_Maru_Gothic } from "next/font/google";

const ZenMaruGothicFont = Zen_Maru_Gothic({
    weight: "900",
    subsets: ["latin"],
});

type KuyoHeaderProps = {
    userImage: string | null;
    userName: string;
    createdAt: string;
};

export default function KuyoCardHeader({ userImage, userName, createdAt }: KuyoHeaderProps) {
  // 投稿日時を日本時間 (JST) でフォーマット
    const formattedDate = new Date(createdAt).toLocaleString("ja-JP", {
            timeZone: "Asia/Tokyo",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
    });

    return (
        <div className={styles.userInfo}>
            <div className={styles.userStatus}>
                <Avatar
                src={userImage ?? ""}
                alt={`${userName}のアイコン`}
                sx={{
                    width: "6vh",
                    height: "6vh",
                    border: "0.2vh solid #FFE097",
                }}
                />
                <p className={`${ZenMaruGothicFont.className} ${styles.userName}`}>
                    {userName}
                </p>
            </div>
            <div className={`${ZenMaruGothicFont.className} ${styles.postDate}`}>
                {formattedDate}
            </div>
        </div>
    );
}
