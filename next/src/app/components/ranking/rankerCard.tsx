'use client';

import styles from '@/app/statics/styles/rankerCard.module.css';
import { Avatar } from '@mui/material';
import { Zen_Maru_Gothic } from "next/font/google";
import { useRouter } from 'next/navigation';
import { setTargetUserId } from '@/app/store/profileStore';
import { calculateRevel } from '@/app/utils/calculateRevel';

interface User {
    id: string;
    name: string;
    image: string | null;
    kuyouCount: number;
    rank?: number;
}
  
interface LoginUser {
    id: string;
    name: string;
    image: string | null;
    kuyouCount: number;
    isRank: boolean;
}
  
interface RankerCardProps {
    user: User;
    loginUser: LoginUser | null;
}

const ZenMaruGothicFont_L = Zen_Maru_Gothic({
    weight: "900",
    subsets: ["latin"],
});
const ZenMaruGothicFont_M = Zen_Maru_Gothic({
    weight: "700",
    subsets: ["latin"],
});

export default function RankerCard({ user, loginUser }: RankerCardProps) {
    const router = useRouter();
    const isCurrentUser = loginUser && user.id === loginUser.id;

    const handleShowUserProfile = () => {
        // グローバルストアにユーザーIDを保存
        setTargetUserId(user.id);
        // プロフィールページに遷移
        router.push('/profile');
    };

    return (
        <button className={`${styles.rankerCard} ${isCurrentUser ? styles.currentUser : ''}`} onClick={handleShowUserProfile}>
            <div className={styles.rank_and_user}>
                <p className={`${ZenMaruGothicFont_M.className} ${styles.rank}`}>
                    {user.rank}位
                </p>
                <div className={styles.user}>
                    <Avatar
                        src={user.image ?? ""}
                        sx = {{
                            width: '6vh',
                            height: '6vh',
                            border: '0.2vh solid #FFE097',
                        }}
                    />
                    <p className={`${ZenMaruGothicFont_L.className} ${styles.name}`}>{user.name}</p>
                    <p className={`${ZenMaruGothicFont_L.className} ${styles.level}`}>供養レベル：{calculateRevel({kuyoCount: user.kuyouCount ?? 0})}</p>
                </div>
            </div>
            <div className={`${ZenMaruGothicFont_M.className} ${styles.count}`}>
                供養数：{user.kuyouCount}
            </div>
        </button> 
    );
}