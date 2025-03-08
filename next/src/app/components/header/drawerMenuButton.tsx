import styles from '@/app/statics/styles/drawerMenuButton.module.css';
import { Button } from '@mui/material';

type DrawerMenuButtonProps = {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DrawerMenuButton ({ show, setShow } : DrawerMenuButtonProps) {

    const handleDraw = () => {
        setShow(!show);
    }

    return (
        <Button
            onClick = {handleDraw}
        >
            <div className={styles.drawerMenuButton}>
                <div className={styles.hamburgerLine}></div>
                <div className={styles.hamburgerLine}></div>
                <div className={styles.hamburgerLine}></div>
            </div>
        </Button>
    )
}