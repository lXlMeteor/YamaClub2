'use client'

import { useState } from "react";
import ContentField from "../components/createPost/contentField";
import TitleField from "../components/createPost/titleField";
import { PostDecideButton } from "../components/createPost/createPostButtons";
import CategoryField from "../components/createPost/categoryField";
import styles from "@/app/statics/styles/createPost.module.css";
import { Zen_Maru_Gothic } from "next/font/google";
import Image from 'next/image';

const ZenMaruGothicFont = Zen_Maru_Gothic({
  weight: "700",
  subsets: ["latin"],
});

export default function CreatePost () {

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [category, setCategory] = useState<string | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [isBlank, setIsBlank] = useState<boolean>(false);
    const [generating, setGenerating] = useState<boolean>(false);
    const [isAiSuccess, setIsAiSuccess] = useState<boolean>(false);

    const handleGenerateImage = async () => {
        try {
          console.log("画像作ります");
          setGenerating(true);
          const response = await fetch('/api/createAiImage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
          });
          const data = await response.json();
          if (!response.ok) {
            console.error(data.error || '画像生成に失敗しました');
          }
          // 取得した Base64 文字列に data URL の頭を付ける
          const imageDataUrl = `data:image/png;base64,${data.imageBase64}`;
          setImage(imageDataUrl);
          setIsAiSuccess(true);
          console.log("生成された画像名と名前:", data);
        } catch (error) {
          console.error("画像生成エラー:", error);
        } finally {
          setGenerating(false);
        }
    };

    return (
        <div className={styles.postCreate}>
            <h1 className={ZenMaruGothicFont.className}>
                君の黒歴史を教えてネ！！
            </h1>
            { isBlank ? <p>全ての項目を記入してください。</p> : <p></p>}
            <TitleField
                title = {title}
                setTitle = {setTitle}
            />
            <CategoryField
                category = {category}
                setCategory = {setCategory}
            />
            <div className={styles.contentField}>
                <ContentField
                    content = {content}
                    setContent = {setContent}
                />
            </div>
            {isAiSuccess && image ? (
                <Image 
                    src={image} 
                    width={200} 
                    height={200} 
                    style={{ objectFit: 'contain', height: 'auto' }} 
                    alt="生成された画像"
                />
            ) : (
                <button 
                    onClick={handleGenerateImage} 
                    disabled={generating || isAiSuccess}
                    style={{ 
                        width: '18vw', 
                        height: '5.5vh', 
                        border: 'none',
                        borderRadius: '10px',
                        backgroundColor: '#FF9B83',
                        color: '#FFFFFF',
                        fontSize: '3vh',
                    }}
                >
                    {generating ? '画像生成中...' : '画像を生成'}
                </button>
            )}
            <div className={styles.postDecideButton} style={isAiSuccess && image ? { paddingBottom: '10vh' } : undefined}>
                <PostDecideButton
                    setIsBlank = {setIsBlank}
                    title = {title}
                    setTitle = {setTitle}
                    category = {category}
                    setCategory = {setCategory}
                    content = {content}
                    setContent = {setContent}
                    image = {image}

                />
            </div>
        </div>
    )
}