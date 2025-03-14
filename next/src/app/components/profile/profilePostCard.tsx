import styles from "@/app/statics/styles/profilePostCard.module.css";
import KuyoCardHeader from "../kuyo/kuyoCardHeader";
import KuyoStamp from "../kuyo/kuyoStamp";
import KuyoCardTitle from "../kuyo/kuyoCardTitle";
import KuyoCardReaction from "../kuyo/kuyoCardReaction";
import { Button } from "@mui/material";
import { useRouter } from 'next/navigation';
import { Zen_Maru_Gothic } from "next/font/google";

const ZenMaruGothicFont = Zen_Maru_Gothic({
    weight: "500",
    subsets: ["latin"],
});


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
    commentCount?: number;
    counter?: number;
};

type Profile = {
    name: string;
    image: string;
    intro: string;
}

type ProfilePostCardProps = {
    data: ProfilePost;
    profile: Profile;
};

export default function ProfilePostCard({ data, profile }: ProfilePostCardProps) {

    const router = useRouter()

    const handleClick = () : void => {
        router.push(`/top/postDetail/${data.id}`);
    }

    const handelClickKuyo = () : void => {
        console.log("供養する");
        router.push(`/kuyo?postId=${data.id}`);
    }

    return (
        <div className={styles.profilePostCard}>
            {((data?.counter ?? 0) >= 2 && data.status === false) ? (
                <button 
                style={{
                    backgroundColor: "rgba(255, 183, 165, 0.5)",
                    color: "black",
                    height: "7vh",
                    width: "7vh",
                    borderRadius: "50%",
                    border: "0.2vw solid #FF7350",
                    fontSize: "1.5vh",
                    lineHeight: "1",
                }}
                onClick={handelClickKuyo}
                >
                    <p className={ZenMaruGothicFont.className}>供養</p>
                    <p className={ZenMaruGothicFont.className}>する</p>
                </button>
            ) : (
                <span style={{width:"7vh", height:"7vh"}}></span>
            )}
            
            <Button
                onClick={handleClick}
            >
                <div
                    style={{
                        width: "70vw",
                        height: "33vh",
                        backgroundImage: `url(${data.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "15px",
                        position: "relative",
                    }}
                >
                    <div className={data.status ? styles.isKuyo : styles.kuyoCardBrind}>
                        <KuyoCardHeader
                            userImage={profile.image}
                            userName={profile.name}
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
            </Button>
            <span style={{width:"7vh", height:"7vh"}}></span>
        </div>
    );
}
