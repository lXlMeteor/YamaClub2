import { Button, FormControl, TextField } from "@mui/material";
import { EditStepType, EditValueType } from "./profileEditButton";
import { useState } from "react";

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
        <div>
            ユーザー名変更
            
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

            <Button
                onClick={handleClick}
            >
                <div>
                    次へ
                </div>
            </Button>
        </div>
    )
}