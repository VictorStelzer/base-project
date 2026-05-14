import React from 'react';

import { DividerProps } from './types';

import { Divider as MuiDivider } from '@mui/material';

import { styled, CSSObject } from '@mui/material/styles';

import { getSpacingStyles, getColor, getRadiusStyles, SPACING_PROPS } from '@/components/styles';

const CUSTOM_PROPS = ['color', 'thickness', 'size', 'vertical', 'radius'];

export const Divider = styled(MuiDivider as any, {
    shouldForwardProp: (prop) =>
        !([
            ...SPACING_PROPS,
            ...CUSTOM_PROPS
        ] as string[]).includes(prop as string),
})<DividerProps>(({ theme, ...props }) => {
    const isVertical = props.vertical || props.orientation === 'vertical';
    const lineColor = props.color ? getColor(theme, props.color) : theme.palette.divider;

    const thickness =
        props.thickness !== undefined
            ? typeof props.thickness === 'number'
                ? `${props.thickness}px`
                : props.thickness
            : '1px';

    const lineLength =
        props.size !== undefined
            ? typeof props.size === 'number'
                ? `${props.size}px`
                : props.size
            : undefined;

    const lineStyles: CSSObject = isVertical
        ? {
              alignSelf: 'stretch',
              width: 0,
              height: lineLength ?? '100%',
              border: 'none',
              borderRightWidth: thickness,
              borderRightStyle: 'solid',
              borderRightColor: lineColor,
          }
        : {
              width: lineLength ?? '100%',
              height: 0,
              border: 'none',
              borderBottomWidth: thickness,
              borderBottomStyle: 'solid',
              borderBottomColor: lineColor,
          };

    return {
        ...getSpacingStyles(theme, props),
        ...lineStyles,
        ...getRadiusStyles(theme, { radius: props.radius }),
    } as CSSObject;
}) as React.FC<DividerProps>;
