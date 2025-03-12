import { Box, Button, Modal, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CommentField from "./commentField";

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
        setContent(""); // モーダルを閉じたらコメントをリセット
    };

    const handleSubmit = async (): Promise<void> => {
        if (!content.trim()) {
            alert("コメントを入力してください。");
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
                throw new Error("コメントの投稿に失敗しました。");
            }

            alert("コメントが投稿されました！");
            handleClose(); // 投稿後にモーダルを閉じる
        } catch (error) {
            console.error(error);
            alert("エラーが発生しました。もう一度お試しください。");
        }
    };

    return (
        <div>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleClick}
            >
                コメントを作成
            </Button>

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
                        width: "80vw",
                        maxWidth: "80vw",
                        height: "60vh",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 3,
                        borderRadius: 2,
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

                    <CommentField
                        comment={content}
                        setComment={setContent}
                    />

                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleSubmit} 
                        sx={{ mt: 2 }}
                    >
                        投稿する
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}
