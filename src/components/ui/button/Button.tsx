import React from 'react';

import { Props } from './types';

import { Button as MuiButton } from '@mui/material';

import { styled, CSSObject } from '@mui/material/styles';

import {
    getColor, getSpacingStyles, getRadiusStyles, getFlexStyles, getSizeStyles, SPACING_PROPS, HOVER_PROPS, LAYOUT_PROPS, SIZE_PROPS
} from '@/components/styles';

const StyledButton = styled(MuiButton, {
    shouldForwardProp: (prop) =>
        !([
            ...SPACING_PROPS,
            ...HOVER_PROPS,
            ...LAYOUT_PROPS,
            ...SIZE_PROPS,
            'textColor',
            'fontSize',
            'fontWeight',
            'uppercase',
        ] as string[]).includes(prop as string),
})<Props>(({ theme, ...props }) => {
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
        ...hoverStyles
    } as CSSObject;
});

export const Button: React.FC<Props> = ({ variant = 'contained', ...props }) => {
    return <StyledButton variant={variant} {...props} />;
};
