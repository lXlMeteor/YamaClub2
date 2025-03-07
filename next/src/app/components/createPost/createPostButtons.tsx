import { Button } from "@mui/material";

type PostDecideButtonProps = {
    setIsBlank: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    category: string | null;
    setCategory: React.Dispatch<React.SetStateAction<string | null>>;
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    image?: string;
}

export function PostDecideButton ({ setIsBlank, title, setTitle, category, setCategory, content, setContent, image} : PostDecideButtonProps) {

    const handleClick = async () => {
        if( title && category && content ) {
            console.log("投稿内容を確定しました。")
            console.log(`タイトル：${title}`);
            console.log(`カテゴリ：${category}`);
            console.log(`本文：${content}`);
            console.log("-----------------");
            try {
                const response = await fetch('/api/sendPost', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title, category, content, image }),
                });
                const data = await response.json();
                
                // レスポンスが成功でない場合はエラー処理
                if (!response.ok) {
                    throw new Error(data.error || '投稿の作成に失敗しました');
                } else {
                    console.log("投稿成功：", data);
                }
            } catch (error) {
                console.error("投稿エラー：", error);
            }
            
            setTitle("");
            setCategory(null);
            setContent("");
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