import { Button, FormControl, TextField } from "@mui/material";
import { EditStepType, EditValueType } from "./profileEditButton";
import { useState } from "react";
import styles from "@/app/statics/styles/editNameField.module.css";
import { Zen_Maru_Gothic } from "next/font/google";

const ZenMaruGothicFontL = Zen_Maru_Gothic({
  weight: "700",
  subsets: ["latin"],
});


const ZenMaruGothicFontM = Zen_Maru_Gothic({
    weight: "500",
    subsets: ["latin"],
  });

type EditNameFieldProps = {
    setEditStep: React.Dispatch<React.SetStateAction<EditStepType>>;
    profileName: string;
    setEditValue: React.Dispatch<React.SetStateAction<EditValueType>>;
};


export default function EditNameField ({ setEditStep, profileName, setEditValue } : EditNameFieldProps) {

    const [editName, setEditName] = useState<string>(profileName);

    const handleClick = () : void => {
        setEditStep(prev => (prev < 3 ? (prev + 1) as EditStepType : prev));
        setEditValue(prev => ({
            ...prev,
            name: editName,
        }));
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditName(event.target.value);
    };


    return (
        <div className={styles.editNameField}>
            <div className={`${styles.nameFieldTitle} ${ZenMaruGothicFontL.className}`}>
                ユーザー名変更
            </div>
            <div className={styles.nameField}>
                <FormControl sx={{ width: "45vw" }}>
                    <TextField
                        label = "新しいユーザー名"
                        id="outlined-textarea"
                        value={editName}
                        onChange={handleChange}
                        slotProps={{
                            inputLabel: { shrink: true }
                        }}
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            "& .MuiInputBase-root": {
                                height: "6vh",
                            },
                            "& .MuiInputBase-input": {
                                fontSize: "2vh",
                            },
                            "& .MuiOutlinedInput-root": {
                                borderColor: '#FF9B83',
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: '#FF9B83',
                                    borderWidth: 2,
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: '#FF9B83',
                                    borderWidth: 2,
                                },
                            },
                            "& .MuiFormLabel-root": {
                                color: '#4DAFFF',
                                fontWeight: 'bold',
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: '#4DAFFF',
                                fontWeight: 'bold',
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
    )
}