import styles from '@/app/statics/styles/header.module.css'
import { User } from "@prisma/client"
import DrawerMenu from './drowerMenu';
import { Zen_Maru_Gothic } from "next/font/google";

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
            {currentUser ? (
                <div>
                    <p>認証済</p>
                    <p>{currentUser.email}</p>
                </div>
            ) : (
                <p>未認証</p>
            )}
            <h1 className={ZenMaruGothicFont.className}>
                笑ってKUYO
            </h1>
            <DrawerMenu />
        </div>
    )
}
export default Header