import React from 'react';

type LoadNewPostsButtonProps = {
    handleLoadNewPosts: () => void;
    loading: boolean;
};

const LoadNewPostsButton: React.FC<LoadNewPostsButtonProps> = ({ handleLoadNewPosts, loading }) => {
    return (
        <button 
            onClick = {handleLoadNewPosts} 
            disabled = {loading}
            style = {{ border: '1px solid black' }}
        >
            最新の投稿を表示ボタン
        </button>
    );
};

export default LoadNewPostsButton;
