import { Avatar } from "@mui/material";

type UserInfoProps = {
    user: {
        name: string;
        image?: string | null; // null も許可する
    };
    createdAt: string;
    formatDate: (date: string) => string;
};

const UserInfo: React.FC<UserInfoProps> = ({ user, createdAt, formatDate }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", border: "1px solid black" }}>
        <p>ユーザー情報</p>
        <div style={{ display: "flex", alignItems: "center" }}>
            {/* 投稿ユーザーのアイコン */}
            <Avatar src={user.image ?? undefined} sx={{ width: 48, height: 48, mr: 2 }} />
            <div>
            <p>名前：{user.name}</p>
            <p>投稿時間：{formatDate(createdAt)}</p>
            </div>
        </div>
    </div>
  );
};

export default UserInfo;
