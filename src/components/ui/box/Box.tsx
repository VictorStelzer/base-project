import React from 'react';

import { Props } from './types';

import { Box as MuiBox } from '@mui/material';

import { styled, CSSObject, alpha } from '@mui/material/styles';

import { getColor, getRadiusStyles, getFlexStyles, getSpacingStyles, SPACING_PROPS, LAYOUT_PROPS, HOVER_PROPS, SIZE_PROPS } from '@/components/styles';

const applyColorToShadow = (shadowStr: string, colorHex?: string) => {
    if (!shadowStr || shadowStr === 'none' || !colorHex) return shadowStr;
    try {
        const colorWithAlpha = alpha(colorHex, 0.4);
        return shadowStr.replace(/rgba?\([^)]+\)/g, colorWithAlpha);
    } catch {
        return shadowStr.replace(/rgba?\([^)]+\)/g, colorHex);
    }
};

export const Box = styled(MuiBox as any, {
    shouldForwardProp: (prop) =>
        !([
            ...LAYOUT_PROPS,
            ...SPACING_PROPS,
            ...HOVER_PROPS,
            ...SIZE_PROPS,
            'shadow', 'shadowSecondary', 'shadowColor', 'paper', 'bgColor',
        ] as string[]).includes(prop as string),
})<Props>(({ theme, ...props }) => {
    // Box tem hover próprio por causa do shadowColor customizado
    const hoverStyles: CSSObject = props.hover ? {
        transition: 'all 0.2s ease-in-out',
        '&:hover': typeof props.hover === 'object' ? {
            ...((props.hover.shadow !== undefined || props.hover.shadowColor) && {
                boxShadow: props.hover.shadowColor
                    ? applyColorToShadow(theme.shadows[props.hover.shadow ?? 6], getColor(theme, props.hover.shadowColor))
                    : theme.shadows[props.hover.shadow as number]
            }),
            ...(props.hover.color && { color: getColor(theme, props.hover.color) }),
            ...(props.hover.opacity !== undefined && { opacity: props.hover.opacity }),
            ...(props.hover.bg && { backgroundColor: getColor(theme, props.hover.bg) }),
            ...(props.hover.borderColor && {
                borderColor: getColor(theme, props.hover.borderColor),
                borderStyle: 'solid',
                borderWidth: `${props.hover.borderWidth || 1}px`
            }),
            ...(props.hover.scale && { transform: `scale(${props.hover.scale})` })
        } : {
            boxShadow: theme.shadows[6],
        }
    } : {};

    return {
        // --- Layout Flexbox ---
        ...getFlexStyles(theme, props),

        // --- Espaçamento (Padding/Margin) ---
        ...getSpacingStyles(theme, props),

        // --- Estética e Cores ---
        ...(props.paper && { backgroundColor: theme.palette.background.paper }),
        ...(props.bgColor && { backgroundColor: getColor(theme, props.bgColor) }),

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

        ...hoverStyles
    } as CSSObject;
}) as React.FC<Props>;
