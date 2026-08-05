import React from 'react';
import { IconButtonProps } from './types';
import { IconButton as MuiIconButton } from '@mui/material';
import { styled, alpha, CSSObject } from '@mui/material/styles';
import {
    getSpacingStyles, getRadiusStyles, getFlexStyles, getHoverStyles, getSizeStyles, SPACING_PROPS, HOVER_PROPS, LAYOUT_PROPS, SIZE_PROPS, getColor,
    VISIBILITY_PROPS,
    getVisibilityStyles
} from '@/components/styles';

export const IconButton = styled(MuiIconButton, {
    shouldForwardProp: (prop) =>
        !([
            ...SPACING_PROPS,
            ...HOVER_PROPS,
            ...LAYOUT_PROPS,
            ...SIZE_PROPS,
            ...VISIBILITY_PROPS,
            'size',
            'bg',
            'color',
            'circle',
            'radius'
        ] as string[]).includes(prop as string),
})<IconButtonProps>(({ theme, ...props }) => {
    // Resolve a cor principal. O fallback `|| theme.palette.primary.main` não é alcançável
    // em runtime (getColor sempre retorna string quando recebe uma string), mas é necessário
    // para o TS enxergar `resolvedColor` como `string` (não `string | undefined`) nos usos
    // abaixo em `alpha(resolvedColor, ...)`.
    const colorValue = props.color ? getColor(theme, props.color) : theme.palette.action.active;
    const resolvedColor = colorValue || theme.palette.primary.main;

    // Determina a cor de fundo com base na prop 'bg'
    const backgroundColor = typeof props.bg === 'string'
        ? getColor(theme, props.bg)
        : props.bg === true
            ? alpha(resolvedColor, 0.1)
            : undefined;

    const hoverStyles = getHoverStyles(theme, props.hover);

    return {
        // Estilo base do botão
        ...(props.color && { color: resolvedColor }),
        ...(backgroundColor && { backgroundColor }),

        ...getSizeStyles(theme, props),
        ...getFlexStyles(theme, props),
        ...getSpacingStyles(theme, props),
        ...getRadiusStyles(theme, props),

        // Se bg for ativado, aplica um padding padrão (menor que o do Box) se não
        // especificado, e ajusta o radius. Roda depois de getSpacingStyles/getRadiusStyles
        // de propósito, pra realmente vencer os defaults genéricos quando bg está ativo.
        ...(props.bg && {
            borderRadius: props.circle ? '50%' : (typeof props.radius === 'number' ? props.radius : 12),
            padding: props.p !== undefined
                ? (typeof props.p === 'number' ? theme.spacing(props.p) : (props.p === true ? '8px' : props.p))
                : theme.spacing(1),
        }),
        ...(props.size !== undefined ? {
            '& svg, & .MuiSvgIcon-root': {
                fontSize: props.size,
                width: props.size,
                height: props.size
            }
        } : {
            '& svg, & .MuiSvgIcon-root': {
                fontSize: 'inherit',
                width: '1em',
                height: '1em'
            }
        }),
        ...hoverStyles,

        // Assegura que o hover mantenha o estilo se tiver bg, ou use a cor resolvida
        '&:hover': {
            backgroundColor: backgroundColor
                ? typeof props.bg === 'string'
                    ? alpha(backgroundColor, 0.8)
                    : alpha(resolvedColor, 0.2)
                : alpha(resolvedColor, theme.palette.action.hoverOpacity),
            ...(hoverStyles['&:hover'] as CSSObject)
        },
        ...getVisibilityStyles(theme, props),
    } as CSSObject;
}) as React.FC<IconButtonProps>;
