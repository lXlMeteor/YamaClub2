type CommentCloseButtonProps = {
    handleHideComments: () => void;
};
  
const CommentCloseButton: React.FC<CommentCloseButtonProps> = ({ handleHideComments }) => {
  return (
      <div style = {{ textAlign: 'center' }}>
          <button onClick = {handleHideComments}>
              コメント非表示ボタン
          </button>
      </div>
  );
};

export default CommentCloseButton;
  