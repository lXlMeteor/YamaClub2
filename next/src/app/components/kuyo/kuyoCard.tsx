import styles from "@/app/statics/styles/kuyoCard.module.css";
import KuyoCardTitle from "./kuyoCardTitle";
import KuyoCardReaction from "./kuyoCardReaction";
import KuyoStamp from "./kuyoStamp";
import KuyoCardHeader from "./kuyoCardHeader";

type KuyoCardProps = {
    isKuyo: boolean;
};

export default function KuyoCard({ isKuyo }: KuyoCardProps) {
    return (
        <div
            style={{
                width: "70vw",
                height: "30vh",
                backgroundImage: `url(/kurorekisi.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "15px",
                position: "relative",
            }}
        >
            <div className={isKuyo ? styles.isKuyo : styles.kuyoCardBrind}>
                <KuyoCardHeader />
                {isKuyo && (
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 10,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <KuyoStamp />
                    </div>
                )}
                <div className={styles.kuyoCardFooter}>
                    <KuyoCardTitle />
                    <KuyoCardReaction />
                </div>
            </div>
        </div>
    );
}
