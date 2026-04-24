import React from 'react';

import { Props } from './types';

import { Paper as MuiPaper } from '@mui/material';

import { styled, CSSObject, alpha } from '@mui/material/styles';

import {
    getColor, getSpacingStyles, getRadiusStyles, getFlexStyles, getHoverStyles, getSizeStyles, SPACING_PROPS, LAYOUT_PROPS, HOVER_PROPS
} from '@/components/styles';

export const Paper = styled(MuiPaper, {
    shouldForwardProp: (prop) =>
        !([
            ...LAYOUT_PROPS,
            ...SPACING_PROPS,
            ...HOVER_PROPS,
            'height', 'width', 'bgColor', 'glass',
        ] as string[]).includes(prop as string),
})<Props>(({ theme, ...props }) => {
    return {
        // --- Layout Flexbox ---
        ...getFlexStyles(theme, props),

        // --- Dimensões ---
        ...getSizeStyles(theme, props),

        // Paper usa getSpacingStyles (p pode ser boolean, number ou string)
        ...getSpacingStyles(theme, props),

        ...(props.bgColor && { backgroundColor: getColor(theme, props.bgColor) }),
        ...(props.glass && {
            backgroundColor: theme.palette.mode === 'dark' ? alpha('#000', 0.2) : alpha('#fff', 0.2),
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: `1px solid ${theme.palette.mode === 'dark' ? alpha('#fff', 0.1) : alpha('#000', 0.1)}`
        }),
        ...getRadiusStyles(theme, props),
        ...getHoverStyles(theme, props.hover),
    } as CSSObject;
}) as React.FC<Props>;
