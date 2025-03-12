import styles from "@/app/statics/styles/profilePostCard.module.css";
import KuyoCardHeader from "../kuyo/kuyoCardHeader";
import KuyoStamp from "../kuyo/kuyoStamp";
import KuyoCardTitle from "../kuyo/kuyoCardTitle";
import KuyoCardReaction from "../kuyo/kuyoCardReaction";

type ProfilePost = {
    id: string;
    title: string;
    content: string;
    image: string;
    status: boolean;
    createdAt: string;
    reactionCounts: {
        EMPATHY: number;
        LOL: number;
        BIGLOL: number;
    };
    _count: {
        comments: number;
    };
};

type ProfilePostCardProps = {
    data: ProfilePost;
};

export default function ProfilePostCard({ data }: ProfilePostCardProps) {
    return (
        <div
            style={{
                width: "70vw",
                height: "30vh",
                backgroundImage: `url(${data.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "15px",
                position: "relative",
            }}
        >
            <div className={data.status ? styles.isKuyo : styles.kuyoCardBrind}>
                <KuyoCardHeader
                    userImage={data.image}
                    userName={data.title}
                    createdAt={data.createdAt}
                />
                {data.status && (
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
                    <KuyoCardTitle title={data.title} />
                    <KuyoCardReaction reactionCounts={data.reactionCounts} />
                </div>
            </div>
        </div>
    );
}
