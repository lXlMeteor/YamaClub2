import { useState } from "react";
import { Avatar, Button } from "@mui/material";
import { EditStepType, EditValueType } from "./profileEditButton";

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
        <div style={{ textAlign: "center", padding: "20px" }}>
            <Avatar
                src={previewImage || ""}
                sx={{
                    width: "5vw",
                    height: "5vw",
                    margin: "auto",
                }}
            />
            <p>アイコン変更</p>

            <form style={{ display: "block", marginTop: "10px" }}>
                <label htmlFor="image-upload" style={{ display: "block", fontSize: "1.2rem", cursor: "pointer", color: "#007bff", marginBottom: "5px" }}>
                    画像を選択してください
                </label>
                <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "block", margin: "0 auto" }}
                />
            </form>

            <Button onClick={handleClick} sx={{ marginTop: "15px" }}>
                <div>次へ</div>
            </Button>
        </div>
    );
}
