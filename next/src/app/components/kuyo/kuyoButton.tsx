'use client'

import styles from '@/app/statics/styles/kuyoButton.module.css';
import { Button } from '@mui/material';
import hanaImg from "@/app/statics/images/hana.png";
import Image from "next/image";
import { Shippori_Mincho } from "next/font/google";
import { useRouter } from 'next/navigation';

const ShipporiMincho = Shippori_Mincho({
  weight: "800",
  subsets: ["latin"],
});

type KuyoButtonProps = {
    postId: string;
    isKuyo: boolean;
    setIsKuyo: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function KuyoButton ({ postId, isKuyo, setIsKuyo } : KuyoButtonProps) {
    
    const router = useRouter();

    // /api/letsKuyoを呼び出す関数
    const letsKuyo = async( postId: string ) => {
        console.log("供養処理を開始します");
        const response = await fetch('/api/letsKuyo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ postId }),
        });
        const data = await response.json();
        if(response.ok) {
            console.log(data);
            setIsKuyo(true);
            kuyoAnimation();
        } else {
            console.log(data);
        }
    }

    const kuyoAnimation = () => {
        console.log("供養アニメーションを再生します。");
        const audio1 = new Audio("/sounds/kuyoSound.mp3");
        audio1.play().catch((error) => console.error("音声の再生に失敗しました:", error));

        // 3秒後に次の音声を再生
        setTimeout(() => {
            const audio2 = new Audio("/sounds/angelSound.mp3");
            audio2.play().catch((error) => console.error("音声の再生に失敗しました:", error));
        }, 4000); // 3秒後に音声2を再生

        setTimeout(() => {
            router.push('/kuyo/complete');
        }, 3500);
    }

    const handleClick = () => {
        if(isKuyo === false) {
            console.log("供養します。");
            letsKuyo(postId);
        } else {
            console.log("既に供養済みです。");
        }
    };
    
    
    return (
        <div className={styles.kuyoButton}>
            <Image
                src={hanaImg}
                alt="Obousan"
                width="200"
                height="120"
                style={{
                    width: "10vw",
                    height: "23vh"
                }}
            />
            <div className={styles.kuyoButtonBG}>
                <Button
                    onClick = {handleClick}
                    sx = {{
                        width: "24vh",
                        height: "20vh",
                        borderRadius: "50%",
                    }}
                >
                        <div className={styles.kuyoButtonCircle}>
                            <div className={ `${styles.kuyoButtonText} ${ShipporiMincho.className}`}>
                                <p>供養</p>
                                <p>ボタン</p>
                            </div>
                        </div>
                </Button>
            </div>
            <Image
                src={hanaImg}
                alt="Obousan"
                width="200"
                height="120"
                style={{
                    width: "10vw",
                    height: "23vh"
                }}
            />
        </div>
    )
} 