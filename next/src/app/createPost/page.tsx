'use client'

import { useState } from "react";
import ContentField from "../components/post/ContentField";
import TitleField from "../components/post/TitleField";
import { PostDecideButton } from "../components/post/postButtons";

export default function CreatePost () {

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    return (
        <div>
            投稿ページ
            <TitleField
                title = {title}
                setTitle = {setTitle}
            />
            <ContentField
                content = {content}
                setContent = {setContent}
            />
            <PostDecideButton
                title = {title}
                content = {content}
            />
        </div>
    )
}