import { ReactNode } from 'react';
import { AccordionProps, TypographyProps } from '@mui/material';
import { SpacingProps, RadiusProps, SizeProps } from '@/components/styles';

export interface Props extends Omit<AccordionProps, 'children' | 'title'>, SpacingProps, RadiusProps, SizeProps {
    /** Título do Accordion */
    title: ReactNode;
    /** Conteúdo do Accordion */
    children: ReactNode;
    /** Cor de fundo customizada */
    bgcolor?: string;
    /** Cor do título */
    titleColor?: string;
    /** Estilos customizados para o Typography do título */
    titleStyle?: TypographyProps;
    /** Cor do texto de conteúdo */
    textColor?: string;
    /** Estilos customizados para o Typography do texto */
    textStyle?: TypographyProps;
    /** Ícone de expansão customizado */
    icon?: ReactNode;
    /** Cor do ícone de expansão */
    iconColor?: string;
    /** Posição do ícone de expansão ('start' | 'end') - Padrão: 'end' */
    iconPosition?: 'start' | 'end';
    /** Se true, exibe uma linha de divisão entre o título e o conteúdo */
    divider?: boolean;
}
