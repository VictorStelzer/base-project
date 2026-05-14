import React from 'react';

import { DrawerProps as MuiDrawerProps } from '@mui/material';

export interface DrawerProps extends Omit<MuiDrawerProps, 'variant'> {
    location?: 'top' | 'left' | 'right' | 'bottom';
    icon?: React.ReactNode;
    iconClose?: React.ReactNode;
    variant?: 'overlay' | 'inline';
    children: React.ReactNode;
}
