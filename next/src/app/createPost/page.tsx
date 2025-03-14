'use client'

import { useState } from "react";
import ContentField from "../components/createPost/contentField";
import TitleField from "../components/createPost/titleField";
import { PostDecideButton } from "../components/createPost/createPostButtons";
import CategoryField from "../components/createPost/categoryField";
import styles from "@/app/statics/styles/createPost.module.css";
import { Zen_Maru_Gothic } from "next/font/google";
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";

const ZenMaruGothicFont = Zen_Maru_Gothic({
  weight: "700",
  subsets: ["latin"],
});

export default function CreatePost () {
    const { data: session } = useSession();

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [category, setCategory] = useState<string | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [isBlank, setIsBlank] = useState<boolean>(false);
    const [generating, setGenerating] = useState<boolean>(false);
    const [isAiSuccess, setIsAiSuccess] = useState<boolean>(false);

    const handleGenerateImage = async () => {
        // try {
        //   toast('画像を作成します');
        //   setGenerating(true);
        //   const response = await fetch('/api/createAiImage', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ content }),
        //   });
        //   const data = await response.json();
        //   if (!response.ok) {
        //     console.error(data.error || '画像生成に失敗しました');
        //     toast.error("画像の生成に失敗しました");
        //     return null;
        //   }
        //   // 取得した Base64 文字列に data URL の頭を付ける
        //   const imageDataUrl = `data:image/png;base64,${data.imageBase64}`;
        //   toast.success('画像が作成されました');
        //   setImage(imageDataUrl);
        //   setIsAiSuccess(true);
        //   console.log("生成された画像名と名前:", data);
        // } catch (error) {
        //   console.error("画像生成エラー:", error);
        //   toast.error("画像の生成に失敗しました");
        // } finally {
        //   setGenerating(false);
        // }
        try {
            toast('画像を作成します');
            setGenerating(true);

            // ユーザーIDと時間を組み合わせてユニークな名前を生成
            const userId = session?.user?.id || 'anonymous';
            const timestamp = Date.now();
            const rawName = `${userId}-${timestamp}`;
            
            // ブラウザでのハッシュ計算（crypto.subtle APIを使用）
            let imageName = '';
            try {
                // テキストをバイト配列に変換
                const encoder = new TextEncoder();
                const data = encoder.encode(rawName);
                
                // SHA-256ハッシュを計算
                const hashBuffer = await crypto.subtle.digest('SHA-256', data);
                
                // バッファーを16進数文字列に変換
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                imageName = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            } catch (hashError) {
                // ハッシュ計算ができない場合のフォールバック
                imageName = `user-${userId}-${timestamp}`;
                console.warn('ハッシュ計算エラー、シンプルな名前を使用します:', hashError);
            }
            
            // クライアントから直接Flaskサーバーにリクエスト
            const flaskServerUrl = process.env.NEXT_PUBLIC_FLASK_SERVER_URL;
            console.log(`Flaskサーバー接続先: ${flaskServerUrl}/generate`);
            
            // タイムアウト制御用のAbortController
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 60000); // 60秒タイムアウト
            
            const response = await fetch(`${flaskServerUrl}/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    text: content, 
                    name: imageName 
                }),
                signal: controller.signal
            });
            
            clearTimeout(timeoutId); // タイムアウトをクリア
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('画像生成エラー:', errorText);
                toast.error("画像の生成に失敗しました");
                return null;
            }
            
            // 画像データをバイナリとして取得
            const imageBuffer = await response.arrayBuffer();
            
            // バイナリデータをBase64に変換（ブラウザ対応版）
            const base64 = btoa(
                new Uint8Array(imageBuffer)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            
            // Base64文字列をデータURLに変換
            const imageDataUrl = `data:image/png;base64,${base64}`;
            
            toast.success('画像が作成されました');
            setImage(imageDataUrl);
            setIsAiSuccess(true);
        } catch (error: unknown) {
            if (error instanceof Error && error.name === 'AbortError') {
                console.error('リクエストがタイムアウトしました');
                toast.error('画像生成に時間がかかりすぎています。もう少し待つか、別の内容で試してください。');
            } else {
                console.error("画像生成エラー:", error);
                toast.error("画像の生成に失敗しました");
            }
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
                    style={{ objectFit: 'contain', height: 'auto', borderRadius: '15px' }} 
                    alt="生成された画像"
                />
            ) : (
                <Button
                    onClick={handleGenerateImage} 
                    disabled={generating || isAiSuccess || !content}
                    style={{ 
                        width: '14vw', 
                        height: '7vh', 
                        border: 'none',
                        borderRadius: '50px',
                        backgroundColor: '#FF9B83',
                        color: '#FFFFFF',
                        fontSize: '2vw',
                        marginTop: '4vh',
                    }}
                >
                    <div className={ZenMaruGothicFont.className}>
                        {generating ? '画像生成中...' : '画像を生成'}
                    </div>
                </Button>
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