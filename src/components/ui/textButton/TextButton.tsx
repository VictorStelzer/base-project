import React from 'react';

import { Props } from './types';

import { Link as MuiLink } from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

import { styled } from '@mui/material/styles';

import { getSpacingStyles, getHoverStyles, getFlexStyles, getSizeStyles, SPACING_PROPS, HOVER_PROPS, LAYOUT_PROPS, SIZE_PROPS } from '@/components/styles';

const StyledLink = styled(MuiLink as any, {
    shouldForwardProp: (prop) =>
        !([
            ...SPACING_PROPS,
            ...HOVER_PROPS,
            ...LAYOUT_PROPS,
            ...SIZE_PROPS,
        ] as string[]).includes(prop as string),
})<Props>(({ theme, ...props }) => ({
    cursor: 'pointer',
    ...getSizeStyles(theme, props),
    ...getFlexStyles(theme, props),
    ...getSpacingStyles(theme, props),
    ...getHoverStyles(theme, props.hover),
}));

export const TextButton: React.FC<Props> = ({ href, to, underline = 'none', ...props }) => {
    return (
        <StyledLink component={RouterLink} to={to || href || '#'} underline={underline}{...props} />
    );
};
