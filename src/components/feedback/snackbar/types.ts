import { ReactElement, ReactNode, SyntheticEvent } from 'react';
import { SnackbarProps as MuiSnackbarProps, SnackbarCloseReason as MuiSnackbarCloseReason } from '@mui/material';

export type SnackbarLocation = 'top' | 'left' | 'right' | 'bottom' | 'bottom-left' | 'bottom-right';

/** Mesmos motivos do MUI, mais `closeClick` para o fechamento manual pelo botão ✕. */
export type SnackbarCloseReason = MuiSnackbarCloseReason | 'closeClick';

export interface SnackbarProps extends Omit<MuiSnackbarProps, 'color' | 'autoHideDuration' | 'anchorOrigin' | 'onClose'> {
    message?: ReactNode;
    duration?: number;
    close?: boolean;
    icon?: ReactElement;
    color?: string;
    textColor?: string;
    location?: SnackbarLocation;
    onClose?: (event: SyntheticEvent<Element, Event> | Event, reason: SnackbarCloseReason) => void;
}
