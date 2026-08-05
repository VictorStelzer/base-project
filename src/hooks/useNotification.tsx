import React, { useCallback, useContext, useMemo } from 'react';
import { NotificationContext } from '@/contexts/NotificationContext';
import { SnackbarProps } from '@/components';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { ErrorOutlined } from '@mui/icons-material';

export interface UseNotificationData {
    showSuccess: (message: string) => void;
    showError: (message: string) => void;
    showSnackbar: (options: SnackbarProps & { message: React.ReactNode }) => void;
}

export const useNotification = (): UseNotificationData => {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error('useNotification deve ser usado dentro de um NotificationProvider');
    }

    const { showSnackbar: contextShowSnackbar } = context;

    const showSuccess = useCallback((message: string) => {
        contextShowSnackbar({
            message,
            color: 'success.main',
            close: true,
            icon: <TaskAltIcon />
        });
    }, [contextShowSnackbar]);

    const showError = useCallback((message: string) => {
        contextShowSnackbar({
            message,
            color: 'error.main',
            close: true,
            icon: <ErrorOutlined />
        });
    }, [contextShowSnackbar]);

    const showSnackbar = useCallback((options: SnackbarProps & { message: React.ReactNode }) => {
        contextShowSnackbar(options);
    }, [contextShowSnackbar]);

    return useMemo(() => ({
        showSuccess,
        showError,
        showSnackbar
    }), [showSuccess, showError, showSnackbar]);
};
