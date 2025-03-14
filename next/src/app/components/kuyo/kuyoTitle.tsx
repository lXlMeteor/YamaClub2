import styles from '@/app/statics/styles/kuyoTitle.module.css';
import { Shippori_Mincho } from "next/font/google";
import Image from "next/image";
import cregit from "@/app/statics/images/oto_cregit.png";

const ShipporiMincho = Shippori_Mincho({
  weight: "800",
  subsets: ["latin"],
});


export default function KuyoTitle () {
    return (
        <div className={styles.cregit}>
            <h1 className={`${ShipporiMincho.className} ${styles.kuyoTitle}`}>
                〜供養の間〜
            </h1>
            <div>
            <Image
                src={cregit}
                alt="Obousan"
                width="230"
                height="100"
                style={{
                    width: "6vw",
                    height: "4vh"
                }}
            />
            </div>
        </div>
    )
}