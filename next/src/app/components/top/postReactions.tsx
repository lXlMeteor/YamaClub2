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
    hasReacted: Record<string, { EMPATHY: boolean; LOL: boolean; BIGLOL: boolean }>;
    setHasReacted: React.Dispatch<React.SetStateAction<Record<string, { EMPATHY: boolean; LOL: boolean; BIGLOL: boolean }>>>;
};

export const PostReactions: React.FC<PostReactionsProps> = ({ currentPostId, reactionCounts = { EMPATHY: 0, LOL: 0, BIGLOL: 0 }, updateReactionCount, hasReacted, setHasReacted}) => {
    return (
        <div className={styles.postReactions}>
            <EmpathyButton 
                EMPATHY={reactionCounts.EMPATHY}
                currentPostId={currentPostId}
                updateReactionCount={updateReactionCount}
                hasReacted={hasReacted}
                setHasReacted={setHasReacted}
            />

            <LolButton 
                LOL={reactionCounts.LOL}
                currentPostId={currentPostId}
                updateReactionCount={updateReactionCount}
                hasReacted={hasReacted}
                setHasReacted={setHasReacted}
            />

            <BigLolButton 
                BIGLOL={reactionCounts.BIGLOL}
                currentPostId={currentPostId}
                updateReactionCount={updateReactionCount}
                hasReacted={hasReacted}
                setHasReacted={setHasReacted}
            />
        </div>
    );
};