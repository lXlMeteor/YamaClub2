import { useEffect, useState } from 'react';
import styles from '@/app/statics/styles/kuyoStamp.module.css'
import { Shippori_Mincho } from "next/font/google";

const ShipporiMincho = Shippori_Mincho({
  weight: "800",
  subsets: ["latin"],
});

export default function KuyoStamp() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShow(true); // 1秒後に表示
        }, 1000);
    }, []); // 空の依存配列で初回レンダリング後に実行

    return (
        <div className={`${styles.kuyoStamp} ${ShipporiMincho.className} ${show ? styles.show : ''}`}>
            <div>
                <p className={show ? styles.showText : ''}>供養</p>
                <p className={show ? styles.showText : ''}>完了</p>
            </div>
        </div>
    );
}
