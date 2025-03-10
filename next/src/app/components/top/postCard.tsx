import React, { useState } from 'react';
import UserInfo from './userInfo';
import PostContent from './postContent';
import styles from '@/app/statics/styles/postCard.module.css'
import PostTitleBar from './postTitleBar';
import { Post } from '@/hooks/usePosts';
import { PostReactions } from './postReactions';


interface PostCardProps {
    currentPost: Post;
    isShowComments: boolean;
    handleHideComments: () => void;
    handleShowComments: () => void;
    formatDate: (date: string) => string;
}

const PostCard: React.FC<PostCardProps> = ({
    currentPost,
    isShowComments,
    handleHideComments,
    handleShowComments,
    formatDate
}) => {


    async function handleReaction(
        postId: string,
        type: "EMPATHY" | "LOL" | "BIGLOL",
      ) {
        try {
          const response = await fetch("/api/sendReaction", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postId, type }),
          });
          if(response) {
            console.log(`リアクションを保存しました。タイプ：${type}`)
          }
        } catch (error) {
          console.error("通信エラー:", error);
        }
      }
      
    const [reactionCounts, setReactionCounts] = useState<Record<string, { EMPATHY: number; LOL: number; BIGLOL: number }>>({
        [currentPost.id]: currentPost.reactionCounts || { EMPATHY: 0, LOL: 0, BIGLOL: 0 } // デフォルト値を設定
    });
    
    // 指定の `postId` のカウントを更新する関数
    const updateReactionCount = (postId: string, type: "EMPATHY" | "LOL" | "BIGLOL") => {
        setReactionCounts((prevCounts) => ({
            ...prevCounts,
            [postId]: {
                ...prevCounts[postId], // 既存データがあれば上書き
                [type]: (prevCounts[postId]?.[type] || 0) + 1 // `undefined` を防ぐ
            }
        }));
        handleReaction(postId, type);
    };
    
    return (
        <div className={styles.postCard} style={{ backgroundImage: `url(${currentPost.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className={styles.bgBrind}>
                <UserInfo user={currentPost.user} category={currentPost.category} createdAt={currentPost.createdAt} formatDate={formatDate} />
                <PostContent category={currentPost.category} title={currentPost.title} content={currentPost.content} />
                <div className={styles.postCardFooter}>
                    <PostTitleBar title={currentPost.title} isShowComments={isShowComments} handleHideComments={handleHideComments} handleShowComments={handleShowComments} />
                        <PostReactions
                            currentPostId={currentPost.id}
                            reactionCounts={reactionCounts[currentPost.id]}
                            updateReactionCount={updateReactionCount}
                        />
                </div>
            </div>
        </div>
    );
}
    

export default PostCard;