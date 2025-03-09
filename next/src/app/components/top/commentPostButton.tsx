type CommentPostButtonProps = {
    handleShowComments: () => void;
};
  
  const CommentPostButton: React.FC<CommentPostButtonProps> = ({ handleShowComments }) => {
    return (
      <div style={{ textAlign: 'center' }}>
        <button onClick={handleShowComments}>コメントを見る・投稿するボタン</button>
      </div>
    );
  };
  
  export default CommentPostButton;
  