'use client';

import { useEffect, useState } from 'react';

// レスポンスデータの型定義
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

interface ApiResponse {
  profile: UserProfile;
  post: PostData;
}

export default function Kuyo() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        // 指定した投稿IDで投稿データを取得
        // postId={ここを取得したい投稿IDに置き換える}
        const res = await fetch('/api/getShowPost?postId=54e36933-759d-4539-a50e-4e082ce8cf6c');
        
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'データの取得に失敗しました');
        }
        
        const responseData: ApiResponse = await res.json();
        setData(responseData);
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
  }, []);

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
    <div>
      <h1>APIテスト - 投稿データ取得</h1>
      
      <h2>取得結果</h2>
      <pre style={{ whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: '10px', borderRadius: '5px', overflow: 'auto', maxHeight: '500px' }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}