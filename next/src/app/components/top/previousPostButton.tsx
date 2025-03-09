import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type PreviousPostButtonProps = {
    handlePrevPost: () => void;
    currentIndex: number;
};

const PreviousPostButton: React.FC<PreviousPostButtonProps> = ({ handlePrevPost, currentIndex }) => {
    return (
        <div>
            <IconButton
                onClick = {handlePrevPost}
                disabled = {currentIndex === 0}
                sx = {{
                    bgcolor: 'background.paper',
                    boxShadow: 2,
                    '&:hover': { bgcolor: 'grey.100' },
                    '&.Mui-disabled': { bgcolor: 'grey.200', opacity: 0.4 },
                    width: '5vw',
                    height: '5vw',
                }}
                aria-label = "次の投稿"
            >
                <ArrowBackIcon
                    sx = {{
                        fontSize: '3vw'
                    }}  
                />
            </IconButton>
        </div>
    );
};

export default PreviousPostButton;
