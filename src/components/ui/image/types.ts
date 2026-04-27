import React from 'react';
import { Props as BoxProps } from '../box/types';

export interface Props extends BoxProps, Omit<React.ImgHTMLAttributes<HTMLImageElement>, keyof BoxProps> {
    /** Como a imagem deve se ajustar ao seu contêiner (padrão: 'cover') */
    objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
}
