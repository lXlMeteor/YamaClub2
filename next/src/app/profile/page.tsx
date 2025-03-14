'use client';

import { useEffect, useState } from 'react';
import { getTargetUserId, clearTargetUserId } from '@/app/store/profileStore';
import { KuyoRevelButton, PastPostButton } from '../components/profile/profileButtons';
import styles from '@/app/statics/styles/profile.module.css'
import UserStatus from '../components/profile/userStatus';
import ProfilePostCard from '../components/profile/profilePostCard';
import ProfileAchievement from '../components/profile/profileAchievement';
import ProfileEditButton from '../components/profile/profileEditButton';
import Loading from '../components/loading';


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
    const [loading, setLoading] = useState<boolean>(true);  // ローディング状態を管理

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
            } finally {
                setLoading(false);  // データ取得が終わったらローディングを終了
            }
        };
        fetchProfileData();
    }, []);

    useEffect(() => {
        if (profileData) {
            console.log('プロフィールデータ:', profileData);
        }
    }, [profileData]);

    if (loading) {
        return <Loading />;  // ローディング中に表示
    }

    return (
        <div>
            {profileData && (
                <div className={styles.profile}>
                    <div className={styles.userStatus}>
                        <div className={styles.blank}>
                            {/* あえて何も書いていない。CSSの都合上 */}
                        </div>
                        <UserStatus
                            userImage={profileData.profiles.image}
                            userName={profileData.profiles.name}
                            userIntro={profileData.profiles.intro}
                            kuyoCount={profileData.counts.kuyoCount}
                        />
                        <div className={styles.profileEditButton}>
                            <ProfileEditButton
                                profileImage={profileData.profiles.image}
                                profileName={profileData.profiles.name}
                                profileIntro={profileData.profiles.intro}
                            />
                        </div>
                    </div>
                    <div className={styles.profileButtons}>
                        <PastPostButton
                            switchProfile={switchProfile}
                            setSwitchProfile={setSwitchProfile}
                        />
                        <KuyoRevelButton
                            switchProfile={switchProfile}
                            setSwitchProfile={setSwitchProfile}
                        />
                    </div>
                    <hr></hr>
                    <div className={styles.line}></div>
                    <div className={styles.profileUnder}>
                    {switchProfile ? (
                        profileData && profileData.posts.length > 0 ? (
                            <div>
                                {profileData.posts.map((post, index) => (
                                    <ProfilePostCard
                                        key={index}
                                        data={post}
                                        profile={profileData.profiles}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p>投稿はまだありません。</p>
                        )
                    ) : (
                        <div>
                            <ProfileAchievement
                                kuyo={profileData?.counts.kuyoCount || 0}
                                empathy={profileData?.counts.reactionCounts.EMPATHY || 0}
                                lol={profileData?.counts.reactionCounts.LOL || 0}
                                bigLol={profileData?.counts.reactionCounts.BIGLOL || 0}
                            />
                        </div>
                    )}
                    </div>
                </div>
            )}
        </div>
    );
}
