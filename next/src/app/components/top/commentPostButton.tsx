import { ChatBubbleOutline } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

type CommentPostButtonProps = {
    currentPostId: string;
};

const CommentPostButton: React.FC<CommentPostButtonProps> = ({ currentPostId }) => {
    const router = useRouter();

    const handleClick = () : void => {
        router.push(`/top/postDetail/${currentPostId}`);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Button onClick={handleClick}>
                <ChatBubbleOutline
                    sx={{
                        fontSize: '2.7vw',
                        color: '#FFE097',
                    }}
                />
            </Button>
        </div>
    );
};

export default CommentPostButton;
