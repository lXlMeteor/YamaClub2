import { Button } from "@mui/material";
import { EditStepType, EditValueType } from "./profileEditButton";

type EditSubmitButton = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    editIntro: string
    editValue: EditValueType;
    setEditStep: React.Dispatch<React.SetStateAction<EditStepType>>;
    setEditValue: React.Dispatch<React.SetStateAction<EditValueType>>;
}

export default function EditSubmitButton ({ setOpen, editIntro, editValue, setEditStep, setEditValue } : EditSubmitButton) {

    const handleSubmit = () : void => {
        setEditValue(prev => ({
            ...prev,
            intro: editIntro,
        }));
        console.log({editValue});
        setOpen(false);
        setEditStep(0);
    }

    return (
        <Button
            onClick = {handleSubmit}
        >
            編集を確定
        </Button>
    )
}