'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CreateCommentButton from "@/app/components/postDetail/createCommentButton";
import PostDetailCard from "@/app/components/postDetail/postDetailCard";
import styles from "@/app/statics/styles/postDetail.module.css"
import CommentElement from "@/app/components/postDetail/commentElement";
import toast from 'react-hot-toast';

export interface Post {
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

export interface Profile {
    id: string;
    name: string;
    image?: string;
}

export interface Comment {
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
    const [post, setPost] = useState<Post>();
    const [profile, setProfile] = useState<Profile>();
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
            } catch (error) {
                console.log(error);
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
        <div className={styles.postDetail}>
            {profile && (
                <PostDetailCard
                    postData={post}
                    userData={profile}
                />
            )}

            {profile && (
                <div>
                    <CreateCommentButton
                        postId = {postIdString} />
                </div>
            )}
            
            <hr className={styles.separator} />

            <div className={styles.commentList}>
                {comments.length > 0 ? (
                    <ul>
                        {comments.map(comment => (
                            <div key={comment.id}>
                                <CommentElement
                                    comment = {comment}
                                />
                            </div>
                        ))}
                    </ul>
                ) : (
                    <p>コメントはまだありません。</p>
                )}
            </div>
        </div>
    );
}
