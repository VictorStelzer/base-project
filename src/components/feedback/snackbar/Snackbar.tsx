import React, { SyntheticEvent } from 'react';
import {
    Snackbar as MuiSnackbar,
    SnackbarCloseReason,
    useTheme,
    SnackbarOrigin
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Text } from '@/components';
import { SnackbarProps } from './types';
import { getColor } from '@/components/styles/utils';

export const Snackbar: React.FC<SnackbarProps> = ({
    message,
    duration = 3000,
    close = false,
    icon,
    color = 'primary.main',
    textColor = 'common.white',
    location = 'top',
    open,
    onClose,
    ...rest
}) => {
    const theme = useTheme();

    const getAnchorOrigin = (): SnackbarOrigin => {
        switch (location) {
            case 'left': return { vertical: 'top', horizontal: 'left' };
            case 'right': return { vertical: 'top', horizontal: 'right' };
            case 'bottom': return { vertical: 'bottom', horizontal: 'center' };
            case 'bottom-left': return { vertical: 'bottom', horizontal: 'left' };
            case 'bottom-right': return { vertical: 'bottom', horizontal: 'right' };
            case 'top':
            default: return { vertical: 'top', horizontal: 'center' };
        }
    };

    const handleClose = (
        event: Event | SyntheticEvent<any, Event>,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        if (onClose) {
            onClose(event, reason || 'timeout');
        }
    };

    const resolvedTextColor = getColor(theme, textColor);

    return (
        <MuiSnackbar
            open={open}
            autoHideDuration={duration}
            onClose={handleClose}
            anchorOrigin={getAnchorOrigin()}
            {...rest}
        >
            <Box
                row
                center
                bgcolor={color}
                px={2}
                py={1.5}
                radius
                shadow={3}
                sx={{
                    color: resolvedTextColor,
                    minWidth: 300,
                    '& .MuiSvgIcon-root': {
                        color: 'inherit',
                    }
                }}
            >
                {icon && (
                    <Box row mr={1.5} sx={{ '& .MuiSvgIcon-root': { color: 'inherit' } }}>
                        {icon}
                    </Box>
                )}
                <Text variant="body2" sx={{ flexGrow: 1, color: 'inherit' }}>
                    {message}
                </Text>
                {close && (
                    <IconButton
                        color={textColor}
                        onClick={(e) => handleClose(e, 'timeout')}
                        ml={1}
                    >
                        <CloseIcon />
                    </IconButton>
                )}
            </Box>
        </MuiSnackbar>
    );
};
