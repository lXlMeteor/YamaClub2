'use client';

import { useState, useEffect } from 'react';
import TitleField from '../components/ranking/titleField';
import RankerCard from '../components/ranking/rankerCard';
import styles from '@/app/statics/styles/ranking.module.css';
import styles2 from '@/app/statics/styles/rankerCard.module.css';
import SyncIcon from '@mui/icons-material/Sync';
import { Zen_Maru_Gothic } from "next/font/google";
import { Avatar } from '@mui/material';
import { useRouter } from 'next/navigation';

// APIから返されるデータの型定義
interface User {
  id: string;
  name: string;
  image: string | null;
  kuyouCount: number;
  rank: number;
}

interface KuyoRankingData {
  kuyouUsers: { user: User }[];
  loginUser: {
    id: string;
    name: string;
    image: string | null;
    kuyouCount: number;
    isRank: boolean;
  } | null;
}

const ZenMaruGothicFont_L = Zen_Maru_Gothic({
    weight: "900",
    subsets: ["latin"],
});
const ZenMaruGothicFont_M = Zen_Maru_Gothic({
    weight: "700",
    subsets: ["latin"],
});

export default function KuyoRankingTestPage() {
  const router = useRouter();
  const [data, setData] = useState<KuyoRankingData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState<number>(10);
  
  const fetchData = async () => {
    try {
      const res = await fetch(`/api/getKuyoCount?limit=${limit}`);
      const data: KuyoRankingData = await res.json();
      setData(data);
      console.log('取得データ:', data);
    } catch (err) {
      setError('データ取得エラー');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // 初期ロード時にデータを取得
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  // 再表示ボタンクリック時にデータを再取得
  const handleLoad = () => {
    setLoading(true);
    fetchData();
  }

  const handleShowUserProfile = () => {
    // ログイン中のユーザープロフィールページに遷移
    router.push('/profile');
};

  if (loading) {
    return (
      <div className={styles.container}>
        <TitleField />
        <div>読み込み中...</div>
      </div>
    );
  }
      
      
  
  if (error) {
    return (
      <div className={styles.container}>
        <TitleField />
        <div>エラー: {error}</div>;
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.container}>
        <TitleField />
        <div>データが見つかりません</div>;
      </div>
    );
  }
  
  return (
    <div className={styles.container}>
      <TitleField />
      <div className={styles.rankings}>
          <div className={styles.option}>
            <button className={styles.review} onClick={handleLoad}>
              <SyncIcon sx={{
                fontSize: "2.8vh",
                color: "#FF9B83",
                paddingBottom: "0.3vh",
              }}/>
              <span className={`${ZenMaruGothicFont_M.className} ${styles.text}`}>再表示</span>
            </button>
            <div className={styles.limit}>
              <span className={`${ZenMaruGothicFont_M.className} ${styles.viewCount}`}>表示数：</span>
              <input 
                type="number" 
                value={limit} 
                className={`${ZenMaruGothicFont_M.className} ${styles.input} custom-number-input`} 
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (value < 1) {
                    value = 1;
                  } else if (value > 100) {
                    value = 100;
                  }
                  setLimit(value);
                }} 
              />
            </div>
          </div>
          {data?.kuyouUsers.map((userItem, index) => (
              <RankerCard user={userItem.user} loginUser={data.loginUser} key={index}/>
          ))}

          <span style={{width: "100%", marginBottom: "3vh", borderBottom: "2px dashed black"}}></span>

          {/* ログインユーザーがランクインしていなかったら */}
          {!data.loginUser?.isRank && (
              <button className={styles2.rankerCard} onClick={handleShowUserProfile}>
                <div className={styles2.rank_and_user}>
                    <p className={`${ZenMaruGothicFont_M.className} ${styles2.rank}`} style={{fontSize: "4vh"}}>
                        圏外
                    </p>
                    <div className={styles2.user}>
                        <Avatar
                            src={data.loginUser?.image ?? ""}
                            sx = {{
                                width: '6vh',
                                height: '6vh',
                                border: '0.2vh solid #FFE097',
                            }}
                        />
                        <p className={`${ZenMaruGothicFont_L.className} ${styles2.name}`}>{data.loginUser?.name}</p>
                        <p className={`${ZenMaruGothicFont_L.className} ${styles2.level}`}>供養レベル：特級供養僧</p>
                      </div>
                  </div>
                  <div className={`${ZenMaruGothicFont_M.className} ${styles2.count}`}>
                      供養数：{data.loginUser?.kuyouCount}
                  </div>
              </button> 
          )}
          {/* ----------------------------------------------------- */}
      </div>
    </div>
  );
}