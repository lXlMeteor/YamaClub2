import { Box } from "@mui/material";
import Image from "next/image";

type PostContentProps = {
    category: string;
    title: string;
    content: string;
    image?: string | null;
};

const PostContent: React.FC<PostContentProps> = ({ category, title, content, image }) => {
    return (
        <div style={{ border: "1px solid black", padding: "10px" }}>
        <p>投稿内容</p>
        <p>カテゴリー：{category}</p>
        <p>タイトル：{title}</p>
        <p>文章：{content}</p>
        {image && (
            <Box sx={{ position: "relative", height: 300, mb: 3, borderRadius: 1, overflow: "hidden" }}>
            <Image
                src={image}
                alt={title}
                fill
                style={{ objectFit: "cover" }}
                priority />
            </Box>
        )}
        </div>
    );
};

export default PostContent;
