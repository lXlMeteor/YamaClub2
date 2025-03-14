import { Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";
import { EditStepType, EditValueType } from "./profileEditButton";
import styles from "@/app/statics/styles/editIntroField.module.css";
import { Zen_Maru_Gothic } from "next/font/google";

const ZenMaruGothicFontL = Zen_Maru_Gothic({
  weight: "700",
  subsets: ["latin"],
});


const ZenMaruGothicFontM = Zen_Maru_Gothic({
    weight: "500",
    subsets: ["latin"],
});

type EditIntroFieldProp = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    profileIntro: string;
    editValue: EditValueType;
    setEditValue: React.Dispatch<React.SetStateAction<EditValueType>>;
    setEditStep: React.Dispatch<React.SetStateAction<EditStepType>>;
};

export default function EditIntroField({
    setOpen,
    profileIntro,
    editValue,
    setEditStep,
    setEditValue,
}: EditIntroFieldProp) {
    const [editIntro, setEditIntro] = useState<string>(profileIntro);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditIntro(event.target.value);
    };

    const handleClick = async (): Promise<void> => {
        try {
            // 編集された内容を setEditValue を通じて更新
            setEditValue(prev => ({
                ...prev,
                intro: editIntro,
            }));

            // APIへのリクエスト準備
            const response = await fetch('/api/profileApis', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: editValue.name,
                    image: editValue.image,
                    intro: editIntro,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // 更新が成功した場合
                console.log('Profile updated:', data);
                setOpen(false);
                setEditStep(0);
                window.location.reload();
            } else {
                // エラーがあった場合
                console.error('Profile update failed:', data.error);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className={styles.editIntroField}>
            <div className={`${styles.introFieldTitle} ${ZenMaruGothicFontL.className}`}>
                自己紹介変更
            </div>
            <div>
<FormControl
    sx={{
        width: "45vw",
    }}
>
    <TextField
        label="新しい自己紹介"
        id="outlined-textarea"
        value={editIntro}
        onChange={handleChange}
        multiline
        slotProps={{
            inputLabel: { shrink: true },
        }}
        sx={{
            backgroundColor: "transparent",
            "& .MuiInputBase-root": {
                height: "35vh",
                display: "flex",
            },
            "& .MuiOutlinedInput-root": {
                backgroundColor: "rgba(255, 255, 255, 1)",
                borderColor: "#FF9B83",
                "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FF9B83",
                    borderWidth: 2,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FF9B83",
                    borderWidth: 2,
                },
            },
            "& .MuiInputBase-input": {
                fontSize: "2vh",
            },
            "& .MuiFormLabel-root": {
                color: "#4DAFFF",
                fontWeight: "bold",
            },
            "& .MuiInputLabel-root.Mui-focused": {
                color: "#4DAFFF",
                fontWeight: "bold",
            },
        }}
    />
</FormControl>



            </div>
            <div>
                <Button
                    onClick={handleClick}
                    sx={{
                        marginTop: "5vh",
                        paddingBottom: "1vh",
                        backgroundColor: "#71BFFF",
                        width: "11vw",
                        height: "4.5vh",
                        fontSize: "1.5vw",
                        borderRadius: "30px",
                        color: "#ffffff",
                        transition: "background-color 0.3s ease", // スムーズな色変化
                        "&:hover": {
                            backgroundColor: "#5FAAEF", // ホバー時の色（少し濃い青）
                        },
                        "&:active": {
                            backgroundColor: "#4D98DF", // クリック時の色（さらに濃い青）
                        },
                    }}
                >
                    <div className={ZenMaruGothicFontM.className}>
                        編集を確定
                    </div>
                </Button>
            </div>
        </div>
    );
}
