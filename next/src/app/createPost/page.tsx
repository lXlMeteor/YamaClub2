'use client'

import { useState } from "react";
import ContentField from "../components/createPost/contentField";
import TitleField from "../components/createPost/titleField";
import { PostDecideButton } from "../components/createPost/createPostButtons";
import CategoryField from "../components/createPost/categoryField";
import styles from "@/app/statics/styles/createPost.module.css";
import { Zen_Maru_Gothic } from "next/font/google";

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
            <div className={styles.postDecideButton}>
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
            {image ? (
                <img src={image} style={{ width: 200 }} />
            ) : null}
            <input type="file" accept="image/*" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        setImage(reader.result as string);
                    }
                    reader.readAsDataURL(file);
                }
            }} />
        </div>
    )
}