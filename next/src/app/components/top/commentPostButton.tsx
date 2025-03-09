import { ChatBubbleOutline } from "@mui/icons-material";

type CommentPostButtonProps = {
    handleShowComments: () => void;
};
  
const CommentPostButton: React.FC<CommentPostButtonProps> = ({ handleShowComments }) => {
  return (
      <div style = {{ textAlign: 'center' }}>
          <button onClick = {handleShowComments}>
              <ChatBubbleOutline
                  sx = {{
                      fontSize: '2.7vw',
                      color: '#FFE097',
                  }}
              />
          </button>
      </div>
  );
};

export default CommentPostButton;
  