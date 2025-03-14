import { Box, Button, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Zen_Maru_Gothic } from "next/font/google";
import { useState } from "react";
import EditNameField from "./editNameField";
import EditIntroField from "./editIntroField";
import EditImageField from "./editImageField";

const ZenMaruGothicFont = Zen_Maru_Gothic({
  weight: "500",
  subsets: ["latin"],
});

export type EditStepType = 0 | 1 | 2;

type ProfileEditButtonProps = {
    profileImage: string;
    profileName: string;
    profileIntro: string;
}

export type EditValueType = {
    image: string;
    name: string;
    intro: string;
}


export default function ProfileEditButton ({ profileImage , profileName, profileIntro } : ProfileEditButtonProps) {

    const [open, setOpen] = useState<boolean>(false);
    const [editStep, setEditStep] = useState<EditStepType>(0);
    const [editValue, setEditValue] = useState<EditValueType>({
        image: profileImage,
        name: profileName,
        intro: profileIntro,
    });

    const handleClick = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
        setEditStep(0);
    };

    return (
        <div>
            <Button
                onClick={handleClick}
                sx = {{
                    width: "12.5vw",
                    height: "3.8vh",
                    fontSize: "1.2vw",
                    backgroundColor: "#FF9B83",
                    borderRadius: "50px",
                    color: "#ffffff"
                }}
                >
                <div className={ZenMaruGothicFont.className}>
                    プロフィール編集
                </div>
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
                    {editStep === 0 ? (
                        <EditImageField
                            setEditStep = {setEditStep}
                            profileImage = {editValue.image}
                            setEditValue = {setEditValue}
                        />
                    ) : editStep === 1 ? (
                        <EditNameField
                            setEditStep={setEditStep}
                            profileName = {editValue.name}
                            setEditValue = {setEditValue}
                        />
                    ) : (
                        <EditIntroField
                            setOpen = {setOpen}
                            profileIntro = {editValue.intro}
                            editValue = {editValue}
                            setEditValue = {setEditValue}
                            setEditStep={setEditStep}
                        />
                    )}
                </Box>
            </Modal>
        </div>
    )
}