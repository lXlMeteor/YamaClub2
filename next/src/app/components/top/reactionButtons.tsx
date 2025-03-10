import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import styles from "@/app/statics/styles/reactionButtons.module.css";
import { Zen_Maru_Gothic } from "next/font/google";
import { set } from "zod";

const ZenMaruGothicFont = Zen_Maru_Gothic({
  weight: "900",
  subsets: ["latin"],
});

// 共通のリアクション処理
async function handleReaction(
  postId: string,
  type: "EMPATHY" | "LOL" | "BIGLOL",
  setCount: React.Dispatch<React.SetStateAction<number>>,
  hasReacted: boolean,
  setHasReacted: React.Dispatch<React.SetStateAction<boolean>>
) {
    console.log(postId);
  try {
    const response = await fetch("/api/sendReaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, type }),
    });

    const data = await response.json();
    console.log(`リアクション ${hasReacted ? '再押し' : '成功'}: ${type}`);

    if (response.ok) {
      // フロント側でカウントを増減
      setCount((prev: number) => hasReacted ? prev - 1 : prev + 1);
      setHasReacted(!hasReacted); // リアクション状態のトグル
    } else {
      console.error("エラー:", data.error);
    }
  } catch (error) {
    console.error("通信エラー:", error);
  }
}

// EmpathyButton
type EmpathyButtonProps = {
  EMPATHY: number;
  currentPostId: string;
};

export function EmpathyButton({ EMPATHY, currentPostId }: EmpathyButtonProps) {
  const [count, setCount] = useState<number>(EMPATHY);
  const [hasReacted, setHasReacted] = useState<boolean>(false);

  useEffect(() => {
    setCount(EMPATHY); // 初期カウントの設定
    setHasReacted(false); // リアクション状態の初期化
  }, [EMPATHY]); // EMPATHYが変更されたときに更新

  return (
    <Button onClick={() => handleReaction(currentPostId, "EMPATHY", setCount, hasReacted, setHasReacted)}>
      <div className={`${styles.reactionButton} ${ZenMaruGothicFont.className}`}>
        共感したよ:
        <p>🤝 {count}</p>
      </div>
    </Button>
  );
}

// LolButton
type LolButtonProps = {
  LOL: number;
  currentPostId: string;
};

export function LolButton({ LOL, currentPostId }: LolButtonProps) {
  const [count, setCount] = useState<number>(LOL); // 個別のカウント管理
  const [hasReacted, setHasReacted] = useState<boolean>(false); // リアクション状態

  useEffect(() => {
    setCount(LOL); // 初期カウントの設定
    setHasReacted(false); // リアクション状態の初期化
  }, [LOL]); // LOLが変更されたときに更新

  return (
    <Button onClick={() => handleReaction(currentPostId, "LOL", setCount, hasReacted, setHasReacted)}>
      <div className={`${styles.reactionButton} ${ZenMaruGothicFont.className}`}>
        成長したね！:
        <p>🌱 {count}</p>
      </div>
    </Button>
  );
}

// BigLolButton
type BigLolButtonProps = {
  BIGLOL: number;
  currentPostId: string;
};

export function BigLolButton({ BIGLOL, currentPostId }: BigLolButtonProps) {
  const [count, setCount] = useState<number>(BIGLOL); // 個別のカウント管理
  const [hasReacted, setHasReacted] = useState<boolean>(false); // リアクション状態

  useEffect(() => {
    setCount(BIGLOL); // 初期カウントの設定
    setHasReacted(false); // リアクション状態の初期化
  }, [BIGLOL]); // BIGLOLが変更されたときに更新

  return (
    <Button onClick={() => handleReaction(currentPostId, "BIGLOL", setCount, hasReacted, setHasReacted)}>
      <div className={`${styles.reactionButton} ${ZenMaruGothicFont.className}`}>
        まじおもろい:
        <p>😂 {count}</p>
      </div>
    </Button>
  );
}
