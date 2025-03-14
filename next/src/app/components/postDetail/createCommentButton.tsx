import { Box, Button, Modal, IconButton } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CommentField from "./commentField";
import styles from "@/app/statics/styles/createCommentButton.module.css"
import { Zen_Maru_Gothic } from "next/font/google";
import toast from "react-hot-toast";

const ZenMaruGothicFont = Zen_Maru_Gothic({
    weight: "700",
    subsets: ["latin"],
});

type CreateCommentButtonProps = {
    postId: string;
}

export default function CreateCommentButton({ postId }: CreateCommentButtonProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [content, setContent] = useState<string>("");

    const handleClick = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
        setContent("");
    };

    const handleSubmit = async (): Promise<void> => {
        if (!content.trim()) {
            toast.error("コメントを入力してください");
            return;
        }

        try {
            console.log({postId});
            console.log({content});
            const response = await fetch("/api/createComment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    postId, 
                    replyId: null,  // 現時点では null を渡す
                    content,
                }),
            });

            if (!response.ok) {
                toast.error("コメントの投稿に失敗しました");
                throw new Error("コメントの投稿に失敗しました。");
            }

            toast.success("コメントを投稿しました");
            handleClose();
            window.location.reload();
        } catch (error) {
            console.error(error);
            toast.error("エラーが発生しました。もう一度お試しください。");
        }
        
    };

    return (
        <div>
            <div className={styles.createCommentButton}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleClick}
                    sx = {{
                        backgroundColor: "#FF9B83",
                        borderRadius: "50px",
                    }}
                >
                    <div className={ZenMaruGothicFont.className}>
                        コメントを作成
                    </div>
                </Button>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "75vw",
                        maxWidth: "80vw",
                        height: "65vh",
                        backgroundColor: "#fbe9be",
                        boxShadow: 24,
                        p: 3,
                        borderRadius: "25px",
                        padding: "5vh",
                    }}
                >
                        {/* 閉じるボタン */}
                        <IconButton
                            onClick={handleClose}
                            sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                color: "grey.600",
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    <div className={styles.createField}>
                        <CommentField
                            comment={content}
                            setComment={setContent}
                        />

                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={handleSubmit} 
                            sx={{
                                mt: "1.8vh",
                                backgroundColor: "#FF9B83",
                                width: "10vw",
                                fontSize: "1.5vw",
                                borderRadius: "20px"
                            }}
                        >
                            <div className={ZenMaruGothicFont.className}>
                                投稿する
                            </div>
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
