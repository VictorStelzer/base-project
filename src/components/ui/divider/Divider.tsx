import React from 'react';

import { Props } from './types';

import { Divider as MuiDivider } from '@mui/material';

import { styled, CSSObject } from '@mui/material/styles';

import { getSpacingStyles, getColor, SPACING_PROPS } from '@/components/styles';

const CUSTOM_PROPS = ['color', 'thickness', 'size', 'vertical', 'radius'];

export const Divider = styled(MuiDivider as any, {
    shouldForwardProp: (prop) =>
        !([
            ...SPACING_PROPS,
            ...CUSTOM_PROPS
        ] as string[]).includes(prop as string),
})<Props>(({ theme, ...props }) => {
    const isVertical = props.vertical || props.orientation === 'vertical';
    const resolvedColor = getColor(theme, props.color);
    const thicknessValue = typeof props.thickness === 'number' ? `${props.thickness}px` : props.thickness;
    const sizeValue = typeof props.size === 'number' ? `${props.size}px` : props.size;

    return {
        // --- Espaçamento ---
        ...getSpacingStyles(theme, props),

        // --- Cores e Espessura ---
        ...(props.color && { borderColor: resolvedColor }),
        
        // Se o usuário insistiu em borderBottomColor para thickness (conforme solicitado literalmente)
        // mas geralmente thickness é a largura da borda. Vou aplicar ambos ou priorizar o que faz sentido.
        // O usuário disse: "thickness = borderBottomColor". Vou aplicar como solicitado.
        ...(props.thickness && { 
            borderBottomColor: resolvedColor, // se color for definido, thickness como cor? estranho.
            borderWidth: thicknessValue // assumindo que thickness também dita a largura
        }),

        // --- Arredondar ---
        ...(props.radius && {borderRadius: "50px"} ),

        // --- Tamanho e Orientação ---
        ...(isVertical ? {
            height: sizeValue || '100%',
            width: thicknessValue || '1px',
            borderRightWidth: thicknessValue || '1px',
            borderBottomWidth: 0,
        } : {
            width: sizeValue || '100%',
            height: thicknessValue || '1px',
            borderBottomWidth: thicknessValue || '1px',
            borderRightWidth: 0,
        }),

    } as CSSObject;
}) as React.FC<Props>;
