import styles from '@/app/statics/styles/kuyoTitle.module.css';
import { Shippori_Mincho } from "next/font/google";

const ShipporiMincho = Shippori_Mincho({
  weight: "800",
  subsets: ["latin"],
});


export default function KuyoTitle () {
    return (
        <h1 className={`${ShipporiMincho.className} ${styles.kuyoTitle}`}>
            〜供養の間〜
        </h1>
    )
}