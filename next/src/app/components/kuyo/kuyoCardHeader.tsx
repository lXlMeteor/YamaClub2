import styles from "@/app/statics/styles/kuyoCardHeader.module.css"
import { Avatar } from "@mui/material";
import { Zen_Maru_Gothic } from "next/font/google";

const ZenMaruGothicFont = Zen_Maru_Gothic({
  weight: "900",
  subsets: ["latin"],
});

export default function KuyoCardHeader () {
    return (
        <div className = {styles.userInfo}>
        <div className = {styles.userStatus}>
            <Avatar
                // src={user.image ?? ""}
                sx = {{
                    width: '6vh',
                    height: '6vh',
                    border: '0.2vh solid #FFE097',
                }}
            />
            <p className = {`${ZenMaruGothicFont.className} ${styles.userName}`}>
                {/* {user.name} */}
                供養太朗
            </p>
            {/*<p className = {`${ZenMaruGothicFont.className} ${styles.category}`}>
                カテゴリ：{category}
            </p>*/}
        </div>
        <div className = {`${ZenMaruGothicFont.className} ${styles.postDate}`}>
            {/* {formatDate(createdAt)} */}
            2025/03/02 23:37
        </div>
    </div>
    )
}