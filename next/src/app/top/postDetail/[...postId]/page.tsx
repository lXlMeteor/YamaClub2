'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CreateCommentButton from "@/app/components/postDetail/createCommentButton";

interface Post {
    id: string;
    title: string;
    category: string;
    content: string;
    image?: string;
    userId: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    reactionCounts: {
        EMPATHY: number;
        LOL: number;
        BIGLOL: number;
    };
}

interface Profile {
    id: string;
    name: string;
    image?: string;
}

interface Comment {
    id: string;
    content: string;
    createdAt: string;
    user: {
        id: string;
        name: string;
        image?: string;
    };
}

export default function PostDetail() {
    const { postId } = useParams();
    const postIdString = Array.isArray(postId) ? postId[0] : postId;
    const [post, setPost] = useState<Post | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!postIdString) return;

        const fetchPost = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/getPost?postId=${postIdString}`);

                if (!response.ok) {
                    throw new Error("投稿データの取得に失敗しました");
                }

                const data = await response.json();
                setPost(data.post);
                setProfile(data.profile);
            } catch (err) {
                setError("投稿を取得できませんでした");
            } finally {
                setLoading(false);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await fetch(`/api/getComments?postId=${postIdString}`);
                if (!response.ok) {
                    throw new Error("コメントの取得に失敗しました");
                }

                const data = await response.json();
                setComments(data.comments);
            } catch (err) {
                console.error("コメントの取得エラー:", err);
            }
        };

        fetchPost();
        fetchComments();
    }, [postIdString]);

    if (loading) return <p>読み込み中...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!post) return <p>投稿が見つかりません</p>;
    console.log(comments);
    return (
        <div style={{ padding: "20px" }}>
            <h1>{post.title}</h1>
            <p>カテゴリー: {post.category}</p>
            <p>{post.content}</p>
            {post.image && <img src={post.image} alt="投稿画像" style={{ maxWidth: "100%" }} />}
            <p>作成日時: {new Date(post.createdAt).toLocaleString()}</p>
            <p>共感: {post.reactionCounts.EMPATHY}</p>
            <p>笑い: {post.reactionCounts.LOL}</p>
            <p>大笑い: {post.reactionCounts.BIGLOL}</p>

            <hr />

            {profile && (
                <div>
                    <h2>投稿者情報</h2>
                    <p>名前: {profile.name}</p>
                    {profile.image && <img src={profile.image} alt="プロフィール画像" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />}
                    <CreateCommentButton postId={postIdString} />
                </div>
            )}

            <hr />

            <h2>コメント一覧</h2>
            {comments.length > 0 ? (
                <ul>
                    {comments.map(comment => (
                        <li key={comment.id} style={{ marginBottom: "10px", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
                            <p><strong>{comment.user.name}</strong></p>
                            {comment.user.image && <img src={comment.user.image} alt="ユーザー画像" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />}
                            <p>{comment.content}</p>
                            <p style={{ fontSize: "12px", color: "gray" }}>{new Date(comment.createdAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>コメントはまだありません。</p>
            )}
        </div>
    );
}
