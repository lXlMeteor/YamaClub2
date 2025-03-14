import { Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";
import { EditStepType, EditValueType } from "./profileEditButton";

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
        <div>
            <div>自己紹介変更</div>
            <FormControl sx={{ width: "45vw" }}>
                <TextField
                    label="新しい自己紹介"
                    id="outlined-textarea"
                    value={editIntro}
                    onChange={handleChange}
                    slotProps={{
                        inputLabel: { shrink: true },
                    }}
                    sx={{
                        backgroundColor: "rgba(255, 255, 255, 1)",
                        "& .MuiInputBase-root": {
                            height: "6vh",
                        },
                        "& .MuiInputBase-input": {
                            fontSize: "2vh",
                        },
                        "& .MuiOutlinedInput-root": {
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
            <Button onClick={handleClick}>編集を確定</Button>
        </div>
    );
}
