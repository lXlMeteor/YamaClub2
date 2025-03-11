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
    isKuyo: boolean;
    setIsKuyo: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function KuyoButton ({ isKuyo, setIsKuyo } : KuyoButtonProps) {
    
    const router = useRouter();

    const handleClick = () => {
        if(isKuyo === false) {
            console.log("供養します。");
            setIsKuyo(true);
            const audio = new Audio("/sounds/kuyoSound.mp3");
            audio.play().catch((error) => console.error("音声の再生に失敗しました:", error));
            setTimeout(() => {
                router.push('/kuyo/complete');
            }, 4000);
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