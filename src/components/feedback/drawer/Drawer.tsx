import React, { useState } from 'react';
import { DrawerProps } from './types';
import { Drawer as MuiDrawer, Collapse, ClickAwayListener } from '@mui/material';
import { Box, IconButton, Icon } from '@/components';
import { Menu, Close } from '@mui/icons-material';

export const Drawer: React.FC<DrawerProps> = ({
    location = 'top',
    icon,
    iconClose,
    variant = 'overlay',
    children,
    ...props
}) => {
    const [open, setOpen] = useState(false);

    const defaultIcon = <Icon color='text.secondary' bg icon={<Menu />} />;
    const defaultIconClose = <Icon color='text.secondary' bg icon={<Close />} />;

    const toggleOpen = () => setOpen(!open);

    if (variant === 'inline') {
        return (
            <ClickAwayListener onClickAway={() => setOpen(false)}>
                <Box>
                    <IconButton onClick={toggleOpen}>
                        {open ? (iconClose || defaultIconClose) : (icon || defaultIcon)}
                    </IconButton>
                    <Box position="absolute" top="100%" left={0} width="100%" zIndex={1200}>
                        <Collapse in={open}>
                            <Box bgcolor="background.default" p={3} shadow={3} onClick={() => setOpen(false)}>
                                {children}
                            </Box>
                        </Collapse>
                    </Box>
                </Box>
            </ClickAwayListener>
        );
    }

    return (
        <>
            <IconButton onClick={() => setOpen(true)}>
                {icon || defaultIcon}
            </IconButton>
            <MuiDrawer
                anchor={location}
                open={open}
                onClose={() => setOpen(false)}
                {...props}
            >
                <Box p={2}>
                    <Box row sx={{ justifyContent: "flex-end" }} mb={2}>
                        <IconButton onClick={() => setOpen(false)}>
                            {iconClose || defaultIconClose}
                        </IconButton>
                    </Box>
                    <Box onClick={() => setOpen(false)}>
                        {children}
                    </Box>
                </Box>
            </MuiDrawer>
        </>
    );
}
