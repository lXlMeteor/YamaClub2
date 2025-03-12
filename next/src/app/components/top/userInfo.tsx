import { Avatar } from "@mui/material";
import styles from "@/app/statics/styles/userInfo.module.css"
import { Zen_Maru_Gothic } from "next/font/google";

const ZenMaruGothicFont = Zen_Maru_Gothic({
  weight: "900",
  subsets: ["latin"],
});

type UserInfoProps = {
    user: {
        name: string;
        image?: string | null; // null も許可する
    };
    category: string;
    createdAt: string;
    formatDate: (date: string) => string;
};

const UserInfo: React.FC<UserInfoProps> = ({ user, category, createdAt, formatDate }) => {
  return (
    <div className = {styles.userInfo}>
        <div className = {styles.userStatus}>
            <Avatar
                src={user.image ?? ""}
                sx = {{
                    width: '6vh',
                    height: '6vh',
                    border: '0.2vh solid #FFE097',
                }}
            />
            <p className = {`${ZenMaruGothicFont.className} ${styles.userName}`}>
                {user.name}
            </p>
            <p className = {`${ZenMaruGothicFont.className} ${styles.category}`}>
                カテゴリ：{category}
            </p>
        </div>
        <div className = {`${ZenMaruGothicFont.className} ${styles.postDate}`}>
            {formatDate(createdAt)}
        </div>
    </div>
  );
};

export default UserInfo;
