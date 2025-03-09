import { BigLolButton, EmpathyButton, LolButton } from "./reactionButtons";
import styles from '@/app/statics/styles/postReactions.module.css';

type PostReactionsProps = {
    currentPostId: string;
    reactionCounts: {
        EMPATHY: number;
        LOL: number;
        BIGLOL: number;
    };
    // commentCount: number;
};
  
const PostReactions: React.FC<PostReactionsProps> = ({ reactionCounts, currentPostId/*commentCount*/ }) => {
return (
    <div className = {styles.postReactions}>

        {/* <div className={styles.commentCounter}>
            コメント数：{commentCount}
        </div> */}

        <EmpathyButton
            EMPATHY = {reactionCounts.EMPATHY}
            currentPostId = {currentPostId}
        />

        <LolButton
            LOL = {reactionCounts.LOL}
            currentPostId = {currentPostId}
        />

        <BigLolButton
            BIGLOL = {reactionCounts.BIGLOL}
            currentPostId = {currentPostId}
        />

    </div>
);
};

export default PostReactions;
  