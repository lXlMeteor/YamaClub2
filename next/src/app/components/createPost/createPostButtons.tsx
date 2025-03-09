import { Button } from "@mui/material";
import { useState } from "react";
import { uploadImageToSupabase } from '@/app/utils/uploadImage';
import { Zen_Maru_Gothic } from "next/font/google";

const ZenMaruGothicFont = Zen_Maru_Gothic({
  weight: "700",
  subsets: ["latin"],
});

type PostDecideButtonProps = {
    setIsBlank: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    category: string | null;
    setCategory: React.Dispatch<React.SetStateAction<string | null>>;
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    image: string | null;
}

export function PostDecideButton ({ setIsBlank, title, setTitle, category, setCategory, content, setContent, image} : PostDecideButtonProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClickCreatePost = async () => {
        if( title && category && content ) {
            try {
                setIsSubmitting(true);
                console.log("投稿内容を確定しました。");
                console.log(`タイトル：${title}`);
                console.log(`カテゴリ：${category}`);
                console.log(`本文：${content}`);
                console.log("画像：", image);
                console.log("-----------------");

                let imageUrl = null;

                // 画像がある場合はアップロード
                if (image) {
                    console.log("画像をアップロード中...");
                    
                    // Supabaseストレージに画像をアップロード
                    imageUrl = await uploadImageToSupabase(
                        image,
                        'post-images',  // 画像のバケット名を指定
                    );
                    
                    if (!imageUrl) {
                        throw new Error("画像のアップロードに失敗しました");
                    }
                    
                    console.log("画像のアップロード成功:", imageUrl);
                }

                const response = await fetch('/api/sendPost', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title, category, content, image: imageUrl }),
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
            } finally {
                setIsSubmitting(false);
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
            onClick={handleClickCreatePost}
            disabled={isSubmitting}
            sx={{
                width: '14vw',
                height: '7vh',
                borderRadius: '60px',
                backgroundColor: '#71BFFF',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '2.5vw',
                transition: 'background-color 0.2s ease-in-out',
                '&:hover': {
                    backgroundColor: isSubmitting ? '#71BFFF' : '#5aa7e8', // ホバー時に少し濃い青に変更（送信中は変更しない）
                },
                '&:active': {
                    backgroundColor: '#4792d1', // クリック時はさらに濃い青
                },
                ...(isSubmitting && {
                    opacity: 0.7,
                    cursor: 'not-allowed'
                })
            }}
        >
            <div className={ZenMaruGothicFont.className}>
                {isSubmitting ? '送信中...' : '投稿する'}
            </div>
        </Button>
    )
}