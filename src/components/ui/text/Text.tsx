import React from 'react';

import { Props } from './types';

import { Typography } from '@mui/material';

import { styled, CSSObject } from '@mui/material/styles';

import { getColor, getSpacingStyles, getSizeStyles, SPACING_PROPS, SIZE_PROPS } from '@/components/styles';

export const Text = styled(Typography as any, {
    shouldForwardProp: (prop) =>
        !([
            ...SPACING_PROPS,
            ...SIZE_PROPS,
            'truncate', 'gradient'
        ] as string[]).includes(prop as string),
})<Props>(({ theme, ...props }) => {

    // Lógica de Gradiente no Texto
    const gradientStyles: CSSObject = props.gradient ? {
        background: typeof props.gradient === 'object'
            ? `linear-gradient(${props.gradient.dir || '45deg'}, ${getColor(theme, props.gradient.from)}, ${getColor(theme, props.gradient.to)})`
            : `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main || theme.palette.primary.light})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
    } : {};

    return {
        // --- Espaçamento e Dimensões ---
        ...getSpacingStyles(theme, props),
        ...getSizeStyles(theme, props),

        // --- Truncamento de Múltiplas Linhas (Line Clamp) ---
        ...(props.truncate && {
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: props.truncate,
        }),
        // --- Efeito de Gradiente ---
        ...gradientStyles
    } as CSSObject;
}) as React.FC<Props>;
