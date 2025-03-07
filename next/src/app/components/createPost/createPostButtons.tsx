import { Button } from "@mui/material";

type PostDecideButtonProps = {
    setIsBlank: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    category: string | null;
    setCategory: React.Dispatch<React.SetStateAction<string | null>>;
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    customCategory: string;
    setCutomCategory: React.Dispatch<React.SetStateAction<string>>;
}

export function PostDecideButton ({ setIsBlank, title, setTitle, category, setCategory, content, setContent, customCategory, setCutomCategory} : PostDecideButtonProps) {

    const handleClick = () => {
        if( title && (category || customCategory) && content ) {
            console.log("投稿内容を確定しました。")
            console.log(`タイトル：${title}`);

            if (category === "その他") {
                console.log(`カスタムカテゴリ：${customCategory}`);
            } else {
                console.log(`カテゴリ：${category}`);
            }

            console.log(`本文：${content}`);
            
            setTitle("");
            setCategory("");
            setContent("");
            setCutomCategory("");
            setIsBlank(false);
        } else {
            setIsBlank(true);
        }
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