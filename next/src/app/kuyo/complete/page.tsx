'use client'

import { GoTopButton, SoundButton } from "@/app/components/complete/completeButtons";
import styles from "@/app/statics/styles/complete.module.css";
import { Shippori_Mincho } from "next/font/google";

const ShipporiMincho = Shippori_Mincho({
  weight: "800",
  subsets: ["latin"],
});

export default function Complete () {

    return (
        <div className={styles.completeBG}>
            <div className={styles.completeText}>
                <h1 className={ShipporiMincho.className}>
                    供養に成功しました。
                </h1>
                <p className={ShipporiMincho.className}>
                    さらば、我が過去、、、
                </p>
                <div className={styles.soundButton}>
                    <SoundButton />
                </div>
                <div className={styles.goTopButton}>
                    <GoTopButton />
                </div>
            </div>
        </div>
    );
}
