import { Button } from "@mui/material";

type PostDecideButtonProps = {
    title: string;
    content: string;
}

export function PostDecideButton ({ title, content, } : PostDecideButtonProps) {

    const handleClick = () => {
        console.log("投稿内容を確定しました。")
        console.log(`タイトル：${title}`);
        console.log(`本文：${content}`);
    }

    return(
        <Button
            variant="contained"
            onClick={handleClick}
            sx={{
                width: '13rem',
                height: '4rem',
                borderRadius: '10px',
                backgroundColor: '#FF9B83',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '1.2rem', 
                '&:hover': {
                    backgroundColor: '#E0816D',
                },
            }}
        >
            画像生成
        </Button>
    )
}