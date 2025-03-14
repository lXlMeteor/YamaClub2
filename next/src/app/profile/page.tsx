'use client';

import { useEffect, useState } from 'react';
import { getTargetUserId, clearTargetUserId } from '@/app/store/profileStore';
import { KuyoRevelButton, PastPostButton } from '../components/profile/profileButtons';
import styles from '@/app/statics/styles/profile.module.css'
import UserStatus from '../components/profile/userStatus';
import ProfilePostCard from '../components/profile/profilePostCard';
import ProfileAchievement from '../components/profile/profileAchievement';
import ProfileEditButton from '../components/profile/profileEditButton';

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
        commentCount?: number;
        counter?: number;
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
                    <ProfileEditButton
                        profileImage = {profileData.profiles.image}
                        profileName = {profileData.profiles.name}
                        profileIntro = {profileData.profiles.intro}
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
                                    profile={profileData.profiles}
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
        </div>
    );  
}