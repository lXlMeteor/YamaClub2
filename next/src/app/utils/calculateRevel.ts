type calculareRevelProps = {
    kuyoCount: number
}

export const calculateRevel = ({ kuyoCount }: calculareRevelProps): string => {
    
    if (kuyoCount === 0) {
        return "見習い供養僧";
    } else if (kuyoCount >= 1 && kuyoCount < 3) {
        return "初級供養僧";
    } else if (kuyoCount >= 3 && kuyoCount < 5) {
        return "一般供養僧";
    } else if (kuyoCount >= 5 && kuyoCount < 7) {
        return "達人供養僧";
    } else if (kuyoCount >= 7 && kuyoCount < 10) {
        return "一級供養僧";
    } else if (kuyoCount >= 10 && kuyoCount < 15) {
        return "特級供養僧";
    } else if (kuyoCount >= 15) {
        return "伝説の供養僧";
    }

    return "謎の供養僧";
};
