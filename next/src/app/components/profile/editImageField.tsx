import { useState } from "react";
import { Avatar, Button } from "@mui/material";
import { EditStepType, EditValueType } from "./profileEditButton";
import { Zen_Maru_Gothic } from "next/font/google";
import styles from "@/app/statics/styles/editImageField.module.css";

const ZenMaruGothicFontL = Zen_Maru_Gothic({
  weight: "700",
  subsets: ["latin"],
});


const ZenMaruGothicFontM = Zen_Maru_Gothic({
    weight: "500",
    subsets: ["latin"],
});

type EditImageFieldProps = {
    setEditStep: React.Dispatch<React.SetStateAction<EditStepType>>;
    profileImage: string;
    setEditValue: React.Dispatch<React.SetStateAction<EditValueType>>;
};

export default function EditImageField({ setEditStep, profileImage, setEditValue}: EditImageFieldProps) {
    const [previewImage, setPreviewImage] = useState<string>(profileImage);

    const handleClick = () => {
        setEditStep(prev => (prev < 3 ? (prev + 1) as EditStepType : prev));
        setEditValue(prev => ({
            ...prev,
            image: previewImage,
        }));
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={styles.editImageField}>
            <div className={`${ZenMaruGothicFontL.className} ${styles.imageFieldTitle}`}>
                アイコン変更
            </div>
            <div className={styles.avatar}>
                <Avatar
                    src={previewImage || ""}
                    sx={{
                        width: "15vw",
                        height: "15vw",
                        margin: "auto",
                    }}
                />
            </div>

            <form>
                <div className={`${styles.label} ${ZenMaruGothicFontM.className}`}>
                    画像を選択してください
                </div>
                <div className={styles.input}>
                    <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
            </form>
            <div>
                <Button
                    onClick={handleClick} 
                    sx={{
                        marginTop: "5vh",
                        paddingBottom: "1vh",
                        backgroundColor: "#71BFFF",
                        width: "6vw",
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
                        次へ
                    </div>
                </Button>
            </div>
        </div>
    );
}
