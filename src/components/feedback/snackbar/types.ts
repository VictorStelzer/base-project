import { ReactElement, ReactNode } from 'react';
import { SnackbarProps as MuiSnackbarProps } from '@mui/material';

export type SnackbarLocation = 'top' | 'left' | 'right' | 'bottom' | 'bottom-left' | 'bottom-right';

export interface SnackbarProps extends Omit<MuiSnackbarProps, 'color'> {
    message?: ReactNode;
    duration?: number;
    close?: boolean;
    icon?: ReactElement;
    color?: string;
    textColor?: string;
    location?: SnackbarLocation;
}
