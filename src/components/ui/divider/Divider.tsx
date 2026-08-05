import React from 'react';

import { DividerProps } from './types';

import { Divider as MuiDivider } from '@mui/material';

import { styled, CSSObject } from '@mui/material/styles';

import { getSpacingStyles, getColor, getRadiusStyles, SPACING_PROPS, VISIBILITY_PROPS, getVisibilityStyles } from '@/components/styles';

const CUSTOM_PROPS = ['color', 'thickness', 'size', 'vertical', 'radius'];

const StyledDivider = styled(MuiDivider, {
    shouldForwardProp: (prop) =>
        !([
            ...SPACING_PROPS,
            ...CUSTOM_PROPS,
            ...VISIBILITY_PROPS
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
        ...getVisibilityStyles(theme, props),
    } as CSSObject;
});

export const Divider: React.FC<DividerProps> = ({ vertical, orientation, ...props }) => {
    // `vertical` é um atalho de conveniência só de CSS; a prop real `orientation` do MUI é
    // quem decide o elemento HTML renderizado (<hr> vs role="separator") e o aria-orientation.
    // Sem repassá-la, o Divider fica visualmente vertical mas semanticamente horizontal pra
    // leitores de tela.
    const resolvedOrientation = vertical ? 'vertical' : orientation;
    return <StyledDivider vertical={vertical} orientation={resolvedOrientation} {...props} />;
};
