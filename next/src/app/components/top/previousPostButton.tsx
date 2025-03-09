import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type PreviousPostButtonProps = {
  handlePrevPost: () => void;
  currentIndex: number;
};

const PreviousPostButton: React.FC<PreviousPostButtonProps> = ({ handlePrevPost, currentIndex }) => {
  return (
    <div>
      <p>次の投稿に遷移するボタン</p>
      <IconButton
        onClick={handlePrevPost}
        disabled={currentIndex === 0}
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 2,
          '&:hover': { bgcolor: 'grey.100' },
          '&.Mui-disabled': { bgcolor: 'grey.200', opacity: 0.4 }
        }}
        size="large"
        aria-label="次の投稿"
      >
        <ArrowBackIcon />
      </IconButton>
    </div>
  );
};

export default PreviousPostButton;
