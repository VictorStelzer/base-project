import React, { useState } from 'react';
import { DrawerProps } from './types';
import { Drawer as MuiDrawer, Collapse, ClickAwayListener } from '@mui/material';
import { Box, IconButton, Icon } from '@/components';
import { Menu, Close } from '@mui/icons-material';

// Posição do painel inline em relação ao botão gatilho, conforme `location`.
const getInlinePosition = (location: DrawerProps['location']) => {
    switch (location) {
        case 'bottom':
            return { top: '100%', left: 0, width: '100%' };
        case 'left':
            return { top: 0, right: '100%' };
        case 'right':
            return { top: 0, left: '100%' };
        case 'top':
        default:
            return { bottom: '100%', left: 0, width: '100%' };
    }
};

export const Drawer: React.FC<DrawerProps> = ({
    location = 'top',
    icon,
    iconClose,
    variant = 'overlay',
    children,
    ...props
}) => {
    const { sx, className } = props;
    const [open, setOpen] = useState(false);

    const defaultIcon = <Icon color='text.secondary' bg icon={<Menu />} />;
    const defaultIconClose = <Icon color='text.secondary' bg icon={<Close />} />;

    const toggleOpen = () => setOpen(!open);

    if (variant === 'inline') {
        return (
            <ClickAwayListener onClickAway={() => setOpen(false)}>
                <Box>
                    <IconButton onClick={toggleOpen} aria-label={open ? 'Fechar menu' : 'Abrir menu'}>
                        {open ? (iconClose || defaultIconClose) : (icon || defaultIcon)}
                    </IconButton>
                    <Box position="absolute" zIndex={1200} {...getInlinePosition(location)}>
                        <Collapse in={open}>
                            <Box bgcolor="background.default" p={3} shadow={3} className={className} sx={sx}>
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
            <IconButton onClick={() => setOpen(true)} aria-label="Abrir menu">
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
                        <IconButton onClick={() => setOpen(false)} aria-label="Fechar menu">
                            {iconClose || defaultIconClose}
                        </IconButton>
                    </Box>
                    <Box>
                        {children}
                    </Box>
                </Box>
            </MuiDrawer>
        </>
    );
}
