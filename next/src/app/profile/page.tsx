'use client';

import { useEffect, useState } from 'react';
import { getTargetUserId, clearTargetUserId } from '@/app/store/profileStore';

interface ProfileData {
    profiles: {
      name: string;
      image: string;
      intro: string;
    };
    posts: {
      id: string;
      title: string;
      content: string;
      reactionCounts: {
        EMPATHY: number;
        LOL: number;
        BIGLOL: number;
      };
      _count: {
        comments: number;
      };
    }[];
    counts: {
      kuyoCount: number;
      reactionCounts: {
        EMPATHY: number;
        LOL: number;
        BIGLOL: number;
      };
    };
}

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const targetUserId = getTargetUserId();
        const endpoint = targetUserId 
          ? `/api/getUserProfile?userId=${targetUserId}` 
          : '/api/profileApis';  // 自分のプロフィールAPI
        const response = await fetch(endpoint);
        if (!response.ok) {
          clearTargetUserId();
          throw new Error('プロフィールの取得に失敗しました');
        }
        const data = await response.json();
        setProfileData(data);
        clearTargetUserId();
        console.log(data); // 取得したデータをコンソールに表示
      } catch (error) {
        console.error('エラー:', error);
      }
    };
    fetchProfileData();
  }, []);

  useEffect(() => {
    if (profileData) {
      console.log('プロフィールデータ:', profileData);
    }
  }
  , [profileData]);

  return (
    <div style={{padding: "50px 0"}}>
      {profileData && (
        <div>
          <h2>プロフィール</h2>
          <ul style={{borderBottom: "1px solid black"}}>
            <li>名前: {profileData.profiles.name}</li>
            <li>プロフィール画像: <img src={profileData.profiles.image} alt="プロフィール画像" /></li>
            <li>自己紹介: {profileData.profiles.intro}</li>
          </ul>
          <h2>投稿</h2>
          <ul style={{borderBottom: "1px solid black"}}>
            {profileData.posts.map(post => (
              <li key={post.id} style={{border: "1px solid black"}}>
                <h3>タイトル: {post.title}</h3>
                <p>内容: {post.content}</p>
                <p>リアクション数:</p>
                <ul>
                  <li>EMPATHY: {post.reactionCounts.EMPATHY}</li>
                  <li>LOL: {post.reactionCounts.LOL}</li>
                  <li>BIGLOL: {post.reactionCounts.BIGLOL}</li>
                </ul>
                <p>コメント数: {post._count.comments}</p>
              </li>
            ))}
          </ul>
          <h2>アカウントの供養総数やリアクション総数</h2>
          <ul style={{borderBottom: "1px solid black"}}>
            <li>供養総数: {profileData.counts.kuyoCount}</li>
            <li>リアクション総数:</li>
            <ul>
              <li>EMPATHY: {profileData.counts.reactionCounts.EMPATHY}</li>
              <li>LOL: {profileData.counts.reactionCounts.LOL}</li>
              <li>BIGLOL: {profileData.counts.reactionCounts.BIGLOL}</li>
            </ul>
          </ul>
        </div>
      )}
    </div>
  );
}