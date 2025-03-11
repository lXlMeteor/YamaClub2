import { Button } from "@mui/material";
import styles from "@/app/statics/styles/reactionButtons.module.css";
import { Zen_Maru_Gothic } from "next/font/google";

// Googleフォントの設定
const ZenMaruGothicFont = Zen_Maru_Gothic({
  weight: "900",
  subsets: ["latin"],
});

// **共通のリアクションボタンの型定義**
type ReactionButtonProps = {
    count: number;
    currentPostId: string;
    type: "EMPATHY" | "LOL" | "BIGLOL";
    updateReactionCount: (postId: string, type: "EMPATHY" | "LOL" | "BIGLOL") => void;
    label: string;
    emoji: string;
    hasReacted: Record<string, { EMPATHY: boolean; LOL: boolean; BIGLOL: boolean }>;
    setHasReacted: React.Dispatch<React.SetStateAction<Record<string, { EMPATHY: boolean; LOL: boolean; BIGLOL: boolean }>>>;
};


const ReactionButton: React.FC<ReactionButtonProps> = ({ count, currentPostId, type, updateReactionCount, label, emoji, hasReacted, setHasReacted}) => {

    const handleClick = (
        currentPostId: string,
        type: "EMPATHY" | "LOL" | "BIGLOL",
        hasReacted: Record<string, { EMPATHY: boolean; LOL: boolean; BIGLOL: boolean }>,
        setHasReacted: React.Dispatch<React.SetStateAction<Record<string, { EMPATHY: boolean; LOL: boolean; BIGLOL: boolean }>>>,
        updateReactionCount: (postId: string, type: "EMPATHY" | "LOL" | "BIGLOL") => void
    ) => {
        // 反応をカウントする
        updateReactionCount(currentPostId, type);
    
        // 現在のリアクションを取得、もしリアクションがまだなければデフォルトの値を使用
        const currentReactions = hasReacted[currentPostId] || { EMPATHY: false, LOL: false, BIGLOL: false };
    
        // 該当するリアクションを反転させる
        const updatedReactions = {
            ...currentReactions,
            [type]: !currentReactions[type], // 指定されたリアクションタイプを反転
        };
    
        // setHasReactedを使って状態を更新
        setHasReacted((prev) => ({
            ...prev,
            [currentPostId]: updatedReactions,
        }));
    };

  return (
    // <Button onClick={() => updateReactionCount(currentPostId, type)}>
    <Button onClick={() => handleClick(currentPostId, type, hasReacted, setHasReacted, updateReactionCount)}>
      <div className={hasReacted[currentPostId] && hasReacted[currentPostId][type] 
        ? `${styles.hasReacted} ${ZenMaruGothicFont.className}`
        : `${styles.reactionButton} ${ZenMaruGothicFont.className}`}>
        {label}:
        <p>{emoji} {count}</p>
      </div>
    </Button>
  );
};

// **EmpathyButton**
type EmpathyButtonProps = {
    EMPATHY: number;
    currentPostId: string;
    updateReactionCount: (postId: string, type: "EMPATHY" | "LOL" | "BIGLOL") => void;
    hasReacted: Record<string, { EMPATHY: boolean; LOL: boolean; BIGLOL: boolean }>;
    setHasReacted: React.Dispatch<React.SetStateAction<Record<string, { EMPATHY: boolean; LOL: boolean; BIGLOL: boolean }>>>;
};

export function EmpathyButton({ EMPATHY, currentPostId, updateReactionCount, hasReacted, setHasReacted}: EmpathyButtonProps) {

    return (
        <ReactionButton
            count={EMPATHY}
            currentPostId={currentPostId}
            type="EMPATHY"
            updateReactionCount={updateReactionCount}
            label="共感したよ!"
            emoji="🤝"
            hasReacted={hasReacted}
            setHasReacted={setHasReacted}
        />
    );
}

// **LolButton**
type LolButtonProps = {
    LOL: number;
    currentPostId: string;
    updateReactionCount: (postId: string, type: "EMPATHY" | "LOL" | "BIGLOL") => void;
    hasReacted: Record<string, { EMPATHY: boolean; LOL: boolean; BIGLOL: boolean }>;
    setHasReacted: React.Dispatch<React.SetStateAction<Record<string, { EMPATHY: boolean; LOL: boolean; BIGLOL: boolean }>>>;
};

export function LolButton({ LOL, currentPostId, updateReactionCount, hasReacted, setHasReacted}: LolButtonProps) {

    return (
        <ReactionButton
            count={LOL}
            currentPostId={currentPostId}
            type="LOL"
            updateReactionCount={updateReactionCount}
            label="成長したね！"
            emoji="🌱"
            hasReacted={hasReacted}
            setHasReacted={setHasReacted}
        />
    );
}

// **BigLolButton**
type BigLolButtonProps = {
    BIGLOL: number;
    currentPostId: string;
    updateReactionCount: (postId: string, type: "EMPATHY" | "LOL" | "BIGLOL") => void;
    hasReacted: Record<string, { EMPATHY: boolean; LOL: boolean; BIGLOL: boolean }>;
    setHasReacted: React.Dispatch<React.SetStateAction<Record<string, { EMPATHY: boolean; LOL: boolean; BIGLOL: boolean }>>>;
};

export function BigLolButton({ BIGLOL, currentPostId, updateReactionCount, hasReacted, setHasReacted}: BigLolButtonProps) {

    return (
            <ReactionButton
                count={BIGLOL}
                currentPostId={currentPostId}
                type="BIGLOL"
                updateReactionCount={updateReactionCount}
                label="まじおもろい"
                emoji="😂"
                hasReacted={hasReacted}
                setHasReacted={setHasReacted}
            />
    );
}

// **PostReactionsコンポーネント**
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

export const PostReactions: React.FC<PostReactionsProps> = ({ currentPostId, reactionCounts, updateReactionCount, hasReacted, setHasReacted}) => {
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
