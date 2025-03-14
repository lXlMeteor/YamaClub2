'use client'

import styles from '@/app/statics/styles/kuyo.module.css';
import KuyoTitle from '../components/kuyo/kuyoTitle';
import KuyoCard from '../components/kuyo/kuyoCard';
import KuyoButton from '../components/kuyo/kuyoButton';
import Obousan from '../components/kuyo/obousan';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Footer from '../components/footer/footer';

interface UserProfile {
    id: string;
    name: string;
    image: string | null;
  }
  
  interface PostData {
    id: string;
    title: string;
    content: string;
    category: string;
    image: string | null;
    userId: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    _count: {
      comments: number;
    };
    reactionCounts: {
      EMPATHY: number;
      LOL: number;
      BIGLOL: number;
    };
  }
  
  export interface ApiResponse {
    profile: UserProfile;
    post: PostData;
  }


  function KuyoContent() {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isKuyo, setIsKuyo] = useState<boolean>(false);

    // クエリパラメータから postId を取得
    const searchParams = useSearchParams();
    const postId = searchParams.get('postId');

    useEffect(() => {
        async function fetchPost() {
          try {
            setLoading(true);
            // 指定した投稿IDで投稿データを取得
            if (!postId) {
              throw new Error('postId が指定されていません');
            }
            const res = await fetch(`/api/getShowPost?postId=${postId}`);
            
            if (!res.ok) {
              const errorData = await res.json();
              throw new Error(errorData.error || 'データの取得に失敗しました');
            }
            
            const responseData: ApiResponse = await res.json();
            setData(responseData);
            setIsKuyo(responseData.post.status);
            console.log('取得したデータ:', responseData);
          } catch (err: unknown) {
            console.error('エラー発生:', err);
            // エラーの型を確認してから処理
            if (err instanceof Error) {
              setError(err.message);
            } else {
              setError('未知のエラーが発生しました');
            }
          } finally {
            setLoading(false);
          }
        }
        fetchPost();
      }, [postId]);
    
      if (loading) {
        return <div>読み込み中...</div>;
      }
      
      if (error) {
        return <div>エラー: {error}</div>;
      }
    
      if (!data) {
        return <div>データが見つかりません</div>;
      }

    return (
        <div className={styles.backImage}>
            {/* <h2>取得結果</h2>
            <pre style={{ whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: '10px', borderRadius: '5px', overflow: 'auto', maxHeight: '500px' }}>
                {JSON.stringify(data, null, 2)}
            </pre> */}
            <div className={styles.kuyoTitle}>
                <KuyoTitle />
            </div>
            <div className={styles.kuyoCard}>
                <KuyoCard
                    isKuyo = {isKuyo}
                    data = {data}
                />
            </div>
            <div className={styles.kuyoFooter}>
                <Obousan />
                <div className={styles.kuyoButton}>
                    <KuyoButton
                        postId = {data.post.id}
                        isKuyo = {isKuyo}
                        setIsKuyo = {setIsKuyo}
                    />
                </div>
                <Obousan />
            </div>
            <Footer />
        </div>
    )
}

// メインコンポーネントを Suspense でラップ
export default function Kuyo() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <KuyoContent />
    </Suspense>
  );
}