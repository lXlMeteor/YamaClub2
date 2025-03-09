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
};

// **共通のリアクションボタンコンポーネント**
const ReactionButton: React.FC<ReactionButtonProps> = ({ count, currentPostId, type, updateReactionCount, label, emoji }) => {
  return (
    <Button onClick={() => updateReactionCount(currentPostId, type)}>
      <div className={`${styles.reactionButton} ${ZenMaruGothicFont.className}`}>
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
};

export function EmpathyButton({ EMPATHY, currentPostId, updateReactionCount }: EmpathyButtonProps) {
  return (
    <ReactionButton
      count={EMPATHY}
      currentPostId={currentPostId}
      type="EMPATHY"
      updateReactionCount={updateReactionCount}
      label="共感したよ"
      emoji="🤝"
    />
  );
}

// **LolButton**
type LolButtonProps = {
  LOL: number;
  currentPostId: string;
  updateReactionCount: (postId: string, type: "EMPATHY" | "LOL" | "BIGLOL") => void;
};

export function LolButton({ LOL, currentPostId, updateReactionCount }: LolButtonProps) {
  return (
    <ReactionButton
      count={LOL}
      currentPostId={currentPostId}
      type="LOL"
      updateReactionCount={updateReactionCount}
      label="成長したね！"
      emoji="🌱"
    />
  );
}

// **BigLolButton**
type BigLolButtonProps = {
  BIGLOL: number;
  currentPostId: string;
  updateReactionCount: (postId: string, type: "EMPATHY" | "LOL" | "BIGLOL") => void;
};

export function BigLolButton({ BIGLOL, currentPostId, updateReactionCount }: BigLolButtonProps) {
  return (
    <ReactionButton
      count={BIGLOL}
      currentPostId={currentPostId}
      type="BIGLOL"
      updateReactionCount={updateReactionCount}
      label="まじおもろい"
      emoji="😂"
    />
  );
}
