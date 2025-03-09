import React from 'react';

type NewPostsButtonProps = {
    newPostsCount: number;
    handleLoadNewPosts: () => void;
};

const NewPostsButton: React.FC<NewPostsButtonProps> = ({ newPostsCount, handleLoadNewPosts }) => {
  return (
        <button 
            style={{
                width: '100%',
                backgroundColor: 'rgba(0, 0, 255, 0.5)',
            }}
            onClick={handleLoadNewPosts}
        >
        <p>{newPostsCount}件の新しい投稿があります。クリックして表示</p>
        </button>
  );
};

export default NewPostsButton;
