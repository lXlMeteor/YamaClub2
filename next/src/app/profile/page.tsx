'use client';

import { useEffect, useState } from 'react';
import { getTargetUserId, clearTargetUserId } from '@/app/store/profileStore';
<<<<<<< HEAD
import { KuyoRevelButton, PastPostButton } from '../components/profile/profileButtons';
import styles from '@/app/statics/styles/profile.module.css'
import UserStatus from '../components/profile/userStatus';
import ProfilePostCard from '../components/profile/profilePostCard';
import ProfileAchievement from '../components/profile/profileAchievement';
=======
import Image from 'next/image';
>>>>>>> origin

export interface ProfileData {
    profiles: {
        name: string;
        image: string;
        intro: string;
    };
    posts: {
        id: string;
        title: string;
        content: string;
        image: string;
        status: boolean;
        createdAt: string;
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
    const [switchProfile, setSwitchProfile] = useState<boolean>(true);

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

<<<<<<< HEAD
    return (
        <div style={{padding: "50px 0"}}>
            {profileData && (
                <div className={styles.profile}>
                    <UserStatus
                        userImage = {profileData.profiles.image}
                        userName = {profileData.profiles.name}
                        userIntro = {profileData.profiles.intro}
                        kuyoCount = {profileData.counts.kuyoCount}
                    />
                    <div className={styles.profileButtons}>
                        <PastPostButton
                            switchProfile = {switchProfile}
                            setSwitchProfile = {setSwitchProfile}
                        />
                        <KuyoRevelButton
                            switchProfile = {switchProfile}
                            setSwitchProfile = {setSwitchProfile}
                        />
                    </div>
                    <hr></hr>
                    <div className={styles.line}></div>
                    {switchProfile ? 
                        <div>
                            {profileData.posts.map((post, index) => (
                                <ProfilePostCard
                                    key={index}
                                    data={post}
                                />
                            ))}
                        </div>
                    :
                        <div>
                            <ProfileAchievement
                                kuyo = {profileData.counts.kuyoCount}
                                empathy = {profileData.counts.reactionCounts.EMPATHY}
                                lol = {profileData.counts.reactionCounts.LOL}
                                bigLol = {profileData.counts.reactionCounts.BIGLOL}
                            />
                        </div>
                    }
                </div>
            )}
=======
  return (
    <div style={{padding: "50px 0"}}>
      {profileData && (
        <div>
          <h2>プロフィール</h2>
          <ul style={{borderBottom: "1px solid black"}}>
            <li>名前: {profileData.profiles.name}</li>
            <li>プロフィール画像: <Image src={profileData.profiles.image} alt="プロフィール画像" fill style={{ objectFit: 'cover' }}/></li>
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
>>>>>>> origin
        </div>
    );  
}