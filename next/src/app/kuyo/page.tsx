'use client'

import styles from '@/app/statics/styles/kuyo.module.css';
import KuyoTitle from '../components/kuyo/kuyoTitle';
import KuyoCard from '../components/kuyo/kuyoCard';
import KuyoButton from '../components/kuyo/kuyoButton';
import Obousan from '../components/kuyo/obousan';
import { useState } from 'react';

export default function Kuyo () {

    const [isKuyo, setIsKuyo] = useState<boolean>(false);

    return (
        <div className={styles.backImage}>
            <div className={styles.kuyoTitle}>
                <KuyoTitle />
            </div>
            <div className={styles.kuyoCard}>
                <KuyoCard
                    isKuyo = {isKuyo}
                />
            </div>
            <div className={styles.kuyoFooter}>
                <Obousan />
                <div className={styles.kuyoButton}>
                    <KuyoButton
                        isKuyo = {isKuyo}
                        setIsKuyo = {setIsKuyo}
                    />
                </div>
                <Obousan />
            </div>
        </div>
    )
}