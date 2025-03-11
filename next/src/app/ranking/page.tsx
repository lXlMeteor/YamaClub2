'use client';

import { useState, useEffect } from 'react';

// APIから返されるデータの型定義
interface User {
  id: string;
  name: string;
  image: string | null;
  kuyouCount: number;
}

interface LoginUser extends User {
  rank: number;
}

interface KuyoRankingData {
  kuyouUsers: { user: User }[];
  loginUser: LoginUser | null;
}

export default function KuyoRankingTestPage() {
  const [data, setData] = useState<KuyoRankingData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/getKuyoCount?limit=10'); //取得数を10に制限
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
    
    fetchData();
  }, []);
  
  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">〜らんきんぐ〜</h1>
      {loading && <p>読み込み中...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {data && (
        <div>
          <h2 className="font-bold mt-4 mb-2">API レスポンス:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}