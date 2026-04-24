import React from 'react';

import { Props } from './types';

import { IconButton as MuiIconButton } from '@mui/material';

import { styled } from '@mui/material/styles';

import {
    getSpacingStyles, getRadiusStyles, getFlexStyles, getHoverStyles, getSizeStyles, SPACING_PROPS, HOVER_PROPS, LAYOUT_PROPS, SIZE_PROPS
} from '@/components/styles';

export const IconButton = styled(MuiIconButton, {
    shouldForwardProp: (prop) =>
        !([
            ...SPACING_PROPS,
            ...HOVER_PROPS,
            ...LAYOUT_PROPS,
            ...SIZE_PROPS,
            'size',
        ] as string[]).includes(prop as string),
})<Props>(({ theme, ...props }) => ({
    ...getSizeStyles(theme, props),
    ...(props.size !== undefined && { fontSize: props.size }),
    ...getFlexStyles(theme, props),
    ...getSpacingStyles(theme, props),
    ...getRadiusStyles(theme, props),
    '& .MuiSvgIcon-root': { fontSize: 'inherit' },
    ...getHoverStyles(theme, props.hover),
})) as React.FC<Props>;
