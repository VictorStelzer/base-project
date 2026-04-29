import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { SnackbarCloseReason } from '@mui/material';
import { Snackbar } from '@/components';
import { SnackbarProps } from '@/components/feedback/snackbar/types';

export interface NotificationContextData {
    showSnackbar: (options: SnackbarProps) => void;
}

export const NotificationContext = createContext<NotificationContextData | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [snackbarOptions, setSnackbarOptions] = useState<SnackbarProps>({});

    const showSnackbar = useCallback((options: SnackbarProps) => {
        setSnackbarOptions({ ...options });
        setOpen(true);
    }, []);

    const handleClose = useCallback((_event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }, []);

    return (
        <NotificationContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar
                {...snackbarOptions}
                open={open}
                onClose={handleClose}
            />
        </NotificationContext.Provider>
    );
};
