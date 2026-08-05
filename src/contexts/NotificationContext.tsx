import React, { createContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { Snackbar, SnackbarProps, SnackbarCloseReason } from '@/components';

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

    const handleClose = useCallback((_event: React.SyntheticEvent | Event, reason: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }, []);

    const value = useMemo(() => ({ showSnackbar }), [showSnackbar]);

    return (
        <NotificationContext.Provider value={value}>
            {children}
            <Snackbar
                {...snackbarOptions}
                open={open}
                onClose={handleClose}
            />
        </NotificationContext.Provider>
    );
};
