import { useState } from "react";
import { Button } from "@mui/material";
import styles from "@/app/statics/styles/reactionButtons.module.css";
import { Zen_Maru_Gothic } from "next/font/google";

const ZenMaruGothicFont = Zen_Maru_Gothic({
  weight: "900",
  subsets: ["latin"],
});

// 共通のリアクション処理
async function handleReaction(
    postId: string,
    type: "EMPATHY" | "LOL" | "BIGLOL",
    setCount: React.Dispatch<React.SetStateAction<number>>
) {
    try {
        const response = await fetch("/api/sendReaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, type }),
        });

        const data = await response.json();
        console.log(`リアクション成功: ${type}`);

        if (response.ok) {
        setCount((prev: number) => prev + 1);
        } else {
        console.error("エラー:", data.error);
        }
    } catch (error) {
        console.error("通信エラー:", error);
    }
}

type EmpathyButtonProps = {
    EMPATHY: number;
    currentPostId: string;
};

export function EmpathyButton({ EMPATHY, currentPostId }: EmpathyButtonProps) {
    const [count, setCount] = useState<number>(EMPATHY);

    return (
        <Button onClick={() => handleReaction(currentPostId, "EMPATHY", setCount)}>
        <div className={`${styles.reactionButton} ${ZenMaruGothicFont.className}`}>
            共感したよ:
            <p>🤝 {count}</p>
        </div>
        </Button>
    );
}

type LolButtonProps = {
    LOL: number;
    currentPostId: string;
};

export function LolButton({ LOL, currentPostId }: LolButtonProps) {
    const [count, setCount] = useState<number>(LOL);

    return (
        <Button onClick={() => handleReaction(currentPostId, "LOL", setCount)}>
        <div className={`${styles.reactionButton} ${ZenMaruGothicFont.className}`}>
            成長したね！:
            <p>🌱 {count}</p>
        </div>
        </Button>
    );
}

type BigLolButtonProps = {
    BIGLOL: number;
    currentPostId: string;
};

export function BigLolButton({ BIGLOL, currentPostId }: BigLolButtonProps) {
    const [count, setCount] = useState<number>(BIGLOL);

    return (
        <Button onClick={() => handleReaction(currentPostId, "BIGLOL", setCount)}>
        <div className={`${styles.reactionButton} ${ZenMaruGothicFont.className}`}>
            まじおもろい:
            <p>😂 {count}</p>
        </div>
        </Button>
    );
}
