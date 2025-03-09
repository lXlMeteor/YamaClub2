type CommentCloseButtonProps = {
    handleHideComments: () => void;
};
  
const CommentCloseButton: React.FC<CommentCloseButtonProps> = ({ handleHideComments }) => {
  return (
      <div style = {{ textAlign: 'center' }}>
          <p>コメント達</p>
          <button onClick = {handleHideComments}>
              コメント非表示ボタン
          </button>
      </div>
  );
};

export default CommentCloseButton;
  