import { Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

type DrawerMenuCloseButtonProps = {
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DrawerMenuCloseButton ({ setShow } : DrawerMenuCloseButtonProps) {

    const handleClose = () => {
        setShow(false);
    }
    return (
        <Button
            onClick = {handleClose}
        >
            <CloseIcon
                sx = {{
                    fontSize: '5vh',
                    color: '#71BFFF'
                }}
            />
        </Button>
    )
}