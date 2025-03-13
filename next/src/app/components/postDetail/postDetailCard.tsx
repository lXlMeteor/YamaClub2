import styles from '@/app/statics/styles/postDetailCard.module.css';
import KuyoCardHeader from "../kuyo/kuyoCardHeader";
import KuyoStamp from "../kuyo/kuyoStamp";
import KuyoCardTitle from "../kuyo/kuyoCardTitle";
import KuyoCardReaction from "../kuyo/kuyoCardReaction";
import { Post, Profile } from "@/app/top/postDetail/[...postId]/page";

type PostDetailCardProps = {
    postData: Post;
    userData: Profile;
};

export default function PostDetailCard({ postData, userData }: PostDetailCardProps) {

    return (
        <div className={styles.profilePostCard}>
            <div
                style={{
                    width: "70vw",
                    minHeight: "33vh",
                    backgroundImage: `url(${postData.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "15px",
                    position: "relative",
                }}
            >
                <div className={postData.status ? styles.isKuyo : styles.kuyoCardBrind}>
                    <KuyoCardHeader
                        userImage={userData.image ?? ""}
                        userName={postData.title}
                        createdAt={postData.createdAt}
                    />
                    <div className={styles.postContentBG}>
                        <div className={styles.postDetailContent}>
                            {postData.content}
                        </div>
                    </div>
                    {postData.status && (
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
                        <KuyoCardTitle title={postData.title} />
                        <KuyoCardReaction reactionCounts={postData.reactionCounts} />
                    </div>
                </div>
            </div>
        </div>
    );
}
