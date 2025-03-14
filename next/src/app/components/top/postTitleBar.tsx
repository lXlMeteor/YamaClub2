import styles from '@/app/statics/styles/postTitleBar.module.css';
import { Zen_Maru_Gothic } from "next/font/google";
import CommentPostButton from './commentPostButton';

const ZenMaruGothicFont = Zen_Maru_Gothic({
  weight: "900",
  subsets: ["latin"],
});


type PostTitleProps = {
    currentPostId: string;
    title: string;
}

export default function PostTitleBar ({ currentPostId, title, } : PostTitleProps) {
    return (
        <div className = {styles.postTitleBar}>
            <div className = {`${styles.postTitle} ${ZenMaruGothicFont.className}`}>
                <div>
                    {title}
                </div>
                <div className = {styles.commentButton}>
                    <CommentPostButton 
                        currentPostId = {currentPostId}
                    />
                </div>
            </div>
        </div>
    )
}