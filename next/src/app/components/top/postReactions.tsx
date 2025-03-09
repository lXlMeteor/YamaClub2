import { BigLolButton, EmpathyButton, LolButton } from "./reactionButtons";
import styles from '@/app/statics/styles/postReactions.module.css';

type PostReactionsProps = {
    currentPostId: string;
    reactionCounts: {
        EMPATHY: number;
        LOL: number;
        BIGLOL: number;
    };
    updateReactionCount: (postId: string, type: "EMPATHY" | "LOL" | "BIGLOL") => void;
};

export const PostReactions: React.FC<PostReactionsProps> = ({ currentPostId, reactionCounts = { EMPATHY: 0, LOL: 0, BIGLOL: 0 }, updateReactionCount }) => {
    return (
        <div className={styles.postReactions}>
            <EmpathyButton 
                EMPATHY={reactionCounts.EMPATHY}
                currentPostId={currentPostId}
                updateReactionCount={updateReactionCount}
            />

            <LolButton 
                LOL={reactionCounts.LOL}
                currentPostId={currentPostId}
                updateReactionCount={updateReactionCount}
            />

            <BigLolButton 
                BIGLOL={reactionCounts.BIGLOL}
                currentPostId={currentPostId}
                updateReactionCount={updateReactionCount}
            />
        </div>
    );
};