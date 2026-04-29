import React, { useContext } from 'react';
import { NotificationContext } from '@/contexts/NotificationContext';
import { SnackbarProps } from '@/components/feedback/snackbar/types';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const useNotification = () => {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error('useNotification deve ser usado dentro de um NotificationProvider');
    }

    const ShowSuccess = (message: string) => {
        context.showSnackbar({
            message,
            color: 'success.main',
            close: true,
            icon: <TaskAltIcon />
        });
    };

    const ShowError = (message: string) => {
        context.showSnackbar({
            message,
            color: 'error.main',
            close: true,
            icon: <ErrorOutlineIcon />
        });
    };

    const ShowSnackbar = (options: SnackbarProps & { message: React.ReactNode }) => {
        context.showSnackbar(options);
    };

    return {
        ShowSuccess,
        ShowError,
        ShowSnackbar
    };
};
