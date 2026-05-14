import React from 'react';

import { BoxProps } from './types';

import { Box as MuiBox } from '@mui/material';

import { styled, CSSObject } from '@mui/material/styles';

import {
    getColor, getRadiusStyles, getFlexStyles, getSpacingStyles, getSizeStyles, getHoverStyles, applyColorToShadow, SPACING_PROPS, LAYOUT_PROPS, HOVER_PROPS, SIZE_PROPS
} from '@/components/styles';

export const Box = styled(MuiBox as any, {
    shouldForwardProp: (prop) =>
        !([
            ...LAYOUT_PROPS,
            ...SPACING_PROPS,
            ...HOVER_PROPS,
            ...SIZE_PROPS,
            'shadow', 'shadowSecondary', 'shadowColor', 'paper', 'bgcolor',
        ] as string[]).includes(prop as string),
})<BoxProps>(({ theme, ...props }) => {
    // Box agora usa o getHoverStyles global que suporta shadowColor

    return {
        // --- Layout Flexbox ---
        ...getFlexStyles(theme, props),

        // --- Espaçamento (Padding/Margin) ---
        ...getSpacingStyles(theme, props),

        // --- Tamanho ---
        ...getSizeStyles(theme, props),

        // --- Estética e Cores ---
        ...(props.paper && { backgroundColor: theme.palette.background.paper }),
        ...(props.bgcolor && { backgroundColor: getColor(theme, props.bgcolor) }),

        // --- Arredondamento ---
        ...getRadiusStyles(theme, props),

        // --- Sombras ---
        ...((props.shadow !== undefined || (props.shadowColor && !props.shadowSecondary)) && {
            boxShadow: props.shadowColor
                ? applyColorToShadow(typeof props.shadow === 'number' ? theme.shadows[props.shadow] : theme.shadows[4], getColor(theme, props.shadowColor))
                : typeof props.shadow === 'number' ? theme.shadows[props.shadow] : theme.shadows[4]
        }),
        ...(props.shadowSecondary && {
            boxShadow: props.shadowColor
                ? applyColorToShadow(theme.shadows[1], getColor(theme, props.shadowColor))
                : theme.shadows[1]
        }),

        ...getHoverStyles(theme, props.hover)
    } as CSSObject;
}) as React.FC<BoxProps>;
