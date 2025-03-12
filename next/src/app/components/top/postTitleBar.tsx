import styles from '@/app/statics/styles/postTitleBar.module.css';
import { Zen_Maru_Gothic } from "next/font/google";
import CommentCloseButton from './commentCloseButton';
import CommentPostButton from './commentPostButton';

const ZenMaruGothicFont = Zen_Maru_Gothic({
  weight: "900",
  subsets: ["latin"],
});


type PostTitleProps = {
    title: string;
    isShowComments: boolean
    handleHideComments: () => void;
    handleShowComments: () => void;
}

export default function PostTitleBar ({ title, isShowComments, handleHideComments, handleShowComments } : PostTitleProps) {
    return (
        <div className = {styles.postTitleBar}>
            <div className = {`${styles.postTitle} ${ZenMaruGothicFont.className}`}>
                <div>
                    {title}
                </div>
                <div className = {styles.commentButton}>
                    {isShowComments ? (
                        <CommentCloseButton
                            handleHideComments = {handleHideComments}
                        />
                    ) : (
                        <CommentPostButton
                            handleShowComments = {handleShowComments}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}