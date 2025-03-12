import { Box } from "@mui/material";
import styles from "@/app/statics/styles/postCardContent.module.css"
import { Zen_Maru_Gothic } from "next/font/google";

const ZenMaruGothicFont = Zen_Maru_Gothic({
  weight: "400",
  subsets: ["latin"],
});


type PostContentProps = {
    category: string;
    title: string;
    content: string;
    image?: string | null;
};

const PostContent: React.FC<PostContentProps> = ({ content, image }) => {
// const PostContent: React.FC<PostContentProps> = ({ category, title, content, image }) => {
    return (
        <div className={styles.postContent}>
        {/* <p>カテゴリー：{category}</p> */}
        {/* <p>タイトル：{title}</p> */}
            <div className = {`${styles.contentBG} ${ZenMaruGothicFont.className}`}>
                <div className = {styles.contentText}>
                    {content}
                </div>
            </div>
            {image && (
                <Box sx = {{ position: "relative", height: 300, mb: 3, borderRadius: 1, overflow: "hidden" }}>
                </Box>
            )}
        </div>
    );
};

export default PostContent;
