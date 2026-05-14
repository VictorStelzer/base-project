import React from 'react';
import { BoxProps } from '@/components';

export interface ImageProps extends BoxProps, Omit<React.ImgHTMLAttributes<HTMLImageElement>, keyof BoxProps> {
    /** Como a imagem deve se ajustar ao seu contêiner (padrão: 'cover') */
    objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
}
