import React from 'react';
import { BoxProps } from '@/components';

export interface ImageProps extends BoxProps, Omit<React.ImgHTMLAttributes<HTMLImageElement>, keyof BoxProps | 'alt'> {
    /** Como a imagem deve se ajustar ao seu contêiner (padrão: 'cover') */
    objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
    /** Texto alternativo da imagem. Obrigatório por acessibilidade — use `alt=""` para imagens puramente decorativas. */
    alt: string;
}
