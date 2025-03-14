import styles from '@/app/statics/styles/header.module.css'
import { User } from "@prisma/client"
import DrawerMenu from './drowerMenu';
import { Zen_Maru_Gothic } from "next/font/google";
import { Avatar } from "@mui/material";

const ZenMaruGothicFont = Zen_Maru_Gothic({
  weight: "900",
  subsets: ["latin"],
});

type HeaderProps = {
    currentUser: User | null
}

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
    return(
        <div className={styles.header}>
            <DrawerMenu />
            <h1 className={ZenMaruGothicFont.className}>
                笑ってKUYO!
            </h1>
            {currentUser ? (
                <div style={{ display: "flex", alignItems: "center", marginLeft: "1vw", marginRight: "0.6vw" }}>
                    <Avatar
                        src={currentUser.image ?? ""}
                        alt={`${currentUser.name}のアイコン`}
                        sx={{
                            width: "6vh",
                            height: "6vh",
                            border: "0.2vh solid #FFE097",
                        }}
                    />
                    {/* <p>{currentUser.name}</p> */}
                </div>
            ) : (
                <p>未認証</p>
            )}
        </div>
    )
}
export default Header