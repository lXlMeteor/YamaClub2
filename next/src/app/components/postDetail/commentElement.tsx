import { Comment } from "@/app/top/postDetail/[...postId]/page";
import { Avatar } from "@mui/material";
import styles from "@/app/statics/styles/commentElement.module.css"
import { Zen_Maru_Gothic } from "next/font/google";

const ZenMaruGothicFont = Zen_Maru_Gothic({
    weight: "700",
    subsets: ["latin"],
});

const ZenMaruGothicFontS = Zen_Maru_Gothic({
    weight: "500",
    subsets: ["latin"],
});

type CommentElement = {
    comment: Comment;
}

export default function CommentElement ({ comment } : CommentElement) {
    return (
        <div className={styles.commentElement}>
            <div className={styles.userInfo}>
                <Avatar
                    src = {comment.user.image || ""}
                    sx = {{
                        width: "3.8vw",
                        height: "3.8vw"
                    }}
                />
                <div className={`${styles.userName} ${ZenMaruGothicFont.className}`}>
                    {comment.user.name}
                </div>
                <div className={`${styles.createdAt} ${ZenMaruGothicFontS.className}`}>
                    {new Date(comment.createdAt).toLocaleString("ja-JP", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    })}
                </div>
            </div>
            <div className={styles.triangle}></div>
            <div className={` ${styles.comment} ${ZenMaruGothicFont.className}`}>
                <div>
                    {comment.content}
                </div>
            </div>
        </div>
    )
}