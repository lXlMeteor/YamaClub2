import React from 'react';
import UserInfo from './userInfo';
import PostContent from './postContent';
import PostReactions from './postReactions';
import styles from '@/app/statics/styles/postCard.module.css'
import PostTitleBar from './postTitleBar';
import { Post } from '@/hooks/usePosts';

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
    return (
        <div
            className = {styles.postCard}
            style = {{ backgroundImage: `url(${currentPost.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className = {styles.bgBrind}>
                <UserInfo
                    user = {currentPost.user}
                    category = {currentPost.category}
                    createdAt = {currentPost.createdAt}
                    formatDate = {formatDate}
                />
                <PostContent 
                    category = {currentPost.category} 
                    title = {currentPost.title} 
                    content = {currentPost.content} 
                />
                <div className = {styles.postCardFooter}>
                    <PostTitleBar
                        title = {currentPost.title}
                        isShowComments = {isShowComments}
                        handleHideComments = {handleHideComments}
                        handleShowComments = {handleShowComments}
                    />
                    <PostReactions 
                        currentPostId = {currentPost.id}
                        reactionCounts = {currentPost.reactionCounts} 
                        // commentCount = {currentPost._count.comments} 
                    />
                </div>
            </div>
        </div>
    );
};

export default PostCard;
