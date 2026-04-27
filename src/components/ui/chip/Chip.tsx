import React from 'react';

import { Props } from './types';

import { Chip as MuiChip } from '@mui/material';

import { styled, CSSObject } from '@mui/material/styles';

import { getSpacingStyles, getSizeStyles, getHoverStyles, getColor, SPACING_PROPS, HOVER_PROPS, SIZE_PROPS } from '@/components/styles';

export const Chip = styled(MuiChip as any, {
    shouldForwardProp: (prop) =>
        !([
            ...SPACING_PROPS,
            ...HOVER_PROPS,
            ...SIZE_PROPS,
            'textColor'
        ] as string[]).includes(prop as string),
})<Props>(({ theme, ...props }) => {

    return {
        // --- Espaçamento (Padding/Margin) ---
        ...getSpacingStyles(theme, props),

        // --- Tamanho ---
        ...getSizeStyles(theme, props),

        // --- Cores ---
        ...(props.textColor && { color: getColor(theme, props.textColor) }),

        // --- Hover ---
        ...getHoverStyles(theme, props.hover),
    } as CSSObject;
}) as React.FC<Props>;
