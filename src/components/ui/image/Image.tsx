import React from 'react';
import { Box } from '@/components';
import { ImageProps } from './types';
import {
    LAYOUT_PROPS, SPACING_PROPS, HOVER_PROPS, SIZE_PROPS, POSITION_PROPS, VISIBILITY_PROPS,
} from '@/components/styles';

// Mesma lista de props customizadas que o Box filtra do DOM (ver Box.tsx shouldForwardProp).
// No modo zoom, usamos essa lista para decidir o que é estilo do wrapper (Box) e o que é
// atributo nativo de <img> (onError, onLoad, crossOrigin, className, etc.), que deve ir
// para a própria imagem em vez de ser perdido no wrapper.
const BOX_STYLE_PROPS = new Set<string>([
    ...LAYOUT_PROPS, ...SPACING_PROPS, ...HOVER_PROPS, ...SIZE_PROPS, ...POSITION_PROPS, ...VISIBILITY_PROPS,
    'shadow', 'shadowSecondary', 'shadowColor', 'paper', 'bgcolor',
]);

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(({ objectFit = 'cover', src, alt, ...props }, ref) => {

    // Se a pessoa ativou o "zoom", precisamos obrigatoriamente de um wrapper
    // pois o CSS não permite dar scale em um <img> sem que ele cresça para fora de seus limites.
    const hasZoom = props.hover && typeof props.hover === 'object' && props.hover.zoom;

    const BoxImg = Box as any;

    if (hasZoom) {
        const wrapperProps: Record<string, unknown> = {};
        const imgProps: Record<string, unknown> = {};

        Object.entries(props).forEach(([key, value]) => {
            if (BOX_STYLE_PROPS.has(key)) {
                wrapperProps[key] = value;
            } else {
                imgProps[key] = value;
            }
        });

        return (
            <Box {...wrapperProps} displayFlex center>
                <BoxImg
                    component="img"
                    src={src}
                    alt={alt}
                    ref={ref}
                    width="100%"
                    height="100%"
                    {...imgProps}
                    sx={{ objectFit, ...(props.sx as object) }}
                />
            </Box>
        );
    }

    return (
        <BoxImg
            component="img"
            src={src}
            alt={alt}
            ref={ref}
            {...props}
            sx={{ objectFit, ...(props.sx as object) }}
        />
    );
});