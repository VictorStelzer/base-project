import React from 'react';

import { ButtonProps } from './types';

import { Button as MuiButton, CircularProgress, alpha } from '@mui/material';

import { styled, CSSObject } from '@mui/material/styles';

import {
    getColor, getSpacingStyles, getRadiusStyles, getFlexStyles, getSizeStyles, SPACING_PROPS, HOVER_PROPS, LAYOUT_PROPS, SIZE_PROPS,
    VISIBILITY_PROPS,
    getVisibilityStyles
} from '@/components/styles';

const StyledButton = styled(MuiButton, {
    shouldForwardProp: (prop) =>
        !([
            ...SPACING_PROPS,
            ...HOVER_PROPS,
            ...LAYOUT_PROPS,
            ...SIZE_PROPS,
            ...VISIBILITY_PROPS,
            'textColor',
            'fontSize',
            'fontWeight',
            'uppercase',
            'glass',
        ] as string[]).includes(prop as string),
})<ButtonProps>(({ theme, ...props }) => {
    // Button tem hover próprio: color = bgcolor, textColor = color
    const hoverStyles: CSSObject = props.hover ? {
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
            ...(props.hover.shadow !== undefined && { boxShadow: theme.shadows[props.hover.shadow] }),
            ...(props.hover.color && { backgroundColor: getColor(theme, props.hover.color) }),
            ...(props.hover.opacity !== undefined && { opacity: props.hover.opacity }),
            ...(props.hover.borderColor && {
                borderColor: getColor(theme, props.hover.borderColor),
                borderStyle: 'solid',
                borderWidth: `${props.hover.borderWidth || 1}px`
            }),
            ...(props.hover.scale && { transform: `scale(${props.hover.scale})` }),
            ...(props.hover.textColor && { color: getColor(theme, props.hover.textColor) }),
        }
    } : {};

    return {
        textTransform: props.uppercase ? 'uppercase' : 'none',
        ...(props.fontSize && { fontSize: props.fontSize }),
        ...(props.fontWeight && { fontWeight: props.fontWeight }),
        ...(props.textColor && { color: getColor(theme, props.textColor) }),
        ...getSizeStyles(theme, props),
        ...getFlexStyles(theme, props),
        ...getSpacingStyles(theme, props),
        ...getRadiusStyles(theme, props),
        ...getVisibilityStyles(theme, props),
        ...(props.glass && {
            backgroundColor: theme.palette.mode === 'dark' ? alpha('#000', 0.2) : alpha('#fff', 0.2),
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: `1px solid ${theme.palette.mode === 'dark' ? alpha('#fff', 0.1) : alpha('#000', 0.1)}`
        }),
        ...hoverStyles
    } as CSSObject;
});

export const Button: React.FC<ButtonProps> = ({ variant = 'contained', loading, children, disabled, startIcon, ...props }) => {
    return (
        <StyledButton variant={variant} disabled={loading || disabled} startIcon={loading ? null : startIcon}{...props}>
            {loading ? <CircularProgress size={24} color="inherit" /> : children}
        </StyledButton>
    );
};
