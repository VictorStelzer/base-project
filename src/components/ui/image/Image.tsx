import React from 'react';
import { Box } from '@/components/ui/box';
import { Props } from './types';

export const Image = React.forwardRef<HTMLImageElement, Props>(({ objectFit = 'cover', src, alt, ...props }, ref) => {
    
    // Se a pessoa ativou o "zoom", precisamos obrigatoriamente de um wrapper
    // pois o CSS não permite dar scale em um <img> sem que ele cresça para fora de seus limites.
    const hasZoom = props.hover && typeof props.hover === 'object' && props.hover.zoom;

    const BoxImg = Box as any;

    if (hasZoom) {
        // Extraímos as props nativas de <img> para não jogar no <Box> (que vira <div>)
        const { crossOrigin, decoding, loading, referrerPolicy, sizes, srcSet, useMap, ...wrapperProps } = props as any;
        return (
            <Box {...wrapperProps} displayFlex center>
                <BoxImg 
                    component="img" 
                    src={src} 
                    alt={alt}
                    crossOrigin={crossOrigin}
                    decoding={decoding}
                    loading={loading}
                    referrerPolicy={referrerPolicy}
                    sizes={sizes}
                    srcSet={srcSet}
                    useMap={useMap}
                    ref={ref}
                    width="100%" 
                    height="100%" 
                    sx={{ objectFit, ...props.sx }}
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
            sx={{ objectFit, ...props.sx }} 
            {...props} 
        />
    );
});