'use client'

import { useState } from "react";
import { Create, Home, Leaderboard, Logout, Person } from '@mui/icons-material';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon,} from "@mui/material";
import DrawerMenuButton from "./drawerMenuButton";
import DrawerMenuCloseButton from "./drawerCloseButton";
import styles from "@/app/statics/styles/drawerMenu.module.css";
import { Zen_Maru_Gothic } from "next/font/google";

const ZenMaruGothicFontL = Zen_Maru_Gothic({
    weight: "900",
    subsets: ["latin"],
});

const ZenMaruGothicFontM = Zen_Maru_Gothic({
    weight: "700",
    subsets: ["latin"],
});

export default function DrawerMenu () {

    type Menu = {
        title: string;
        href: string;
        icon: JSX.Element;
    };

    const menu: Menu[] = [
        { title: 'とっぷ', href: '/top', icon: <Home /> },
        { title: 'ぷろふぃーる', href: '/profile', icon: <Person /> },
        { title: 'とうこう', href: '/createPost', icon: <Create /> },
        // { title: 'くよう', href: '/kuyo', icon: <DeleteSweep /> },
        { title: 'らんきんぐ', href: '/ranking', icon: <Leaderboard /> },
        { title: 'ろぐあうと', href: '/logOut', icon: <Logout /> },
    ];

    const [show, setShow] = useState<boolean>(false);

    const handleDraw = () => {
        setShow(!show);
    }

    return (
        <div>
            <DrawerMenuButton
                show = {show}
                setShow= {setShow}
            />
            <Drawer anchor = 'left' open = {show}>
                <Box
                    sx = {{
                        height: '100vh',
                        width: '20vw',
                        backgroundColor: '#FFF3D5',
                    }}
                    onClick = {handleDraw}
                >
                    <div className={styles.drawerMenuHeader}>
                        <div className={`${styles.drawerMenuTitle} ${ZenMaruGothicFontL.className}`}>
                            めにゅー
                        </div>
                        <DrawerMenuCloseButton
                            setShow = {setShow}
                        />
                    </div>
                    <List>
                        <div className={styles.drawerMenuList}>
                            {menu.map(obj => (
                                <ListItem key={obj.title}>
                                <ListItemButton href={obj.href}>
                                    <ListItemIcon
                                        sx = {{
                                            color: '#FF9B83'
                                        }}
                                    >
                                        {obj.icon}
                                    </ListItemIcon>
                                        <div className={`${styles.drawerMenuText} ${ZenMaruGothicFontM.className}`}>
                                            {obj.title}
                                        </div>
                                </ListItemButton>
                                </ListItem>
                            ))}
                        </div>
                    </List>
                </Box>
            </Drawer>
        </div>
    );
}
