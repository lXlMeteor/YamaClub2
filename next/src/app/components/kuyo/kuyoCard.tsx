import styles from "@/app/statics/styles/kuyoCard.module.css";
import KuyoCardTitle from "./kuyoCardTitle";
import KuyoCardReaction from "./kuyoCardReaction";
import KuyoStamp from "./kuyoStamp";
import KuyoCardHeader from "./kuyoCardHeader";
import { ApiResponse } from "@/app/kuyo/page";

type KuyoCardProps = {
    data: ApiResponse
    isKuyo: boolean;
};

export default function KuyoCard({ isKuyo, data }: KuyoCardProps) {
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
                <KuyoCardHeader
                    userImage = {data.profile.image}
                    userName = {data.profile.name}
                    createdAt = {data.post.createdAt}
                />
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
                    <KuyoCardTitle 
                        title = {data.post.title}
                    />
                    <KuyoCardReaction
                        reactionCounts = {data.post.reactionCounts}
                    />
                </div>
            </div>
        </div>
    );
}
