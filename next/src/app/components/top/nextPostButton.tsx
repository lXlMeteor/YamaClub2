import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type NextPostButtonProps = {
    handleNextPost: () => void;
    currentIndex: number;
    postsLength: number;
};

const NextPostButton: React.FC<NextPostButtonProps> = ({ handleNextPost, currentIndex, postsLength }) => {
  return (
    <div>
        <p>次の投稿に遷移するボタン</p>
        <IconButton
            onClick={handleNextPost}
            disabled={currentIndex === postsLength - 1}
            sx={{
            bgcolor: 'background.paper',
            boxShadow: 2,
            '&:hover': { bgcolor: 'grey.100' },
            '&.Mui-disabled': { bgcolor: 'grey.200', opacity: 0.4 }
            }}
            size="large"
            aria-label="前の投稿"
        >
            <ArrowForwardIcon />
        </IconButton>
    </div>
  );
};

export default NextPostButton;
