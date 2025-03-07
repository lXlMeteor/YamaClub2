'use client'

import { useState } from "react";
import ContentField from "../components/createPost/contentField";
import TitleField from "../components/createPost/titleField";
import { PostDecideButton } from "../components/createPost/createPostButtons";
import CategoryField from "../components/createPost/categoryField";

export default function CreatePost () {

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [category, setCategory] = useState<string | null>(null);
    const [customCategory, setCustomCategory] = useState<string>("");
    const [isBlank, setIsBlank] = useState<boolean>(false);

    return (
        <div>
            投稿ページ
            { isBlank ? <p>記入漏れがあります。</p> : <p></p>}
            <TitleField
                title = {title}
                setTitle = {setTitle}
            />
            <CategoryField
                category = {category}
                setCategory = {setCategory}
            />
            <ContentField
                content = {content}
                setContent = {setContent}
            />
            <PostDecideButton
                setIsBlank = {setIsBlank}
                title = {title}
                setTitle = {setTitle}
                category = {category}
                setCategory = {setCategory}
                content = {content}
                setContent = {setContent}
            />
        </div>
    )
}