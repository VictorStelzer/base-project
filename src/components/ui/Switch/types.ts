import { ReactNode } from 'react';

import { SwitchProps as MuiSwitchProps } from '@mui/material';

import { SpacingProps, VisibilityProps, SPACING_PROPS, VISIBILITY_PROPS } from '@/components/styles';

type ConflictingProps = typeof SPACING_PROPS[number] | typeof VISIBILITY_PROPS[number];

export interface SwitchProps extends Omit<MuiSwitchProps, ConflictingProps>, SpacingProps, VisibilityProps {
    /** Texto exibido ao lado do switch. Se informado, o switch é envolvido em um FormControlLabel. */
    label?: ReactNode;
}
