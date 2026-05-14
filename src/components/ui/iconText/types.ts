import { ReactNode } from 'react';

import { TextProps } from '@/components';

export interface IconSettings {
    icon: ReactNode;
    color?: string;
    size?: string | number;
    gap?: string | number;
    position?: 'left' | 'right' | 'top' | 'bottom';
}

export interface IconTextProps extends Omit<TextProps, 'color'> {
    /** Cor geral (aplica-se ao ícone e ao texto a menos que sobrescrita na prop icon) */
    color?: string; 
    /** Tamanho geral do texto e base do ícone */
    size?: string | number; 
    /** Configurações específicas do ícone */
    icon: IconSettings;
}
