import { BigLolButton, EmpathyButton, LolButton } from "./reactionButtons";
import styles from '@/app/statics/styles/postReactions.module.css';

type PostReactionsProps = {
    reactionCounts: {
        EMPATHY: number;
        LOL: number;
        BIGLOL: number;
    };
    // commentCount: number;
};
  
const PostReactions: React.FC<PostReactionsProps> = ({ reactionCounts, /*commentCount*/ }) => {
return (
    <div className = {styles.postReactions}>

        {/* <div className={styles.commentCounter}>
            コメント数：{commentCount}
        </div> */}

        <EmpathyButton
            EMPATHY = {reactionCounts.EMPATHY}
        />

        <LolButton
            LOL = {reactionCounts.LOL}
        />

        <BigLolButton
            BIGLOL = {reactionCounts.BIGLOL}
        />

    </div>
);
};

export default PostReactions;
  