import { ReactNode } from 'react';
import { AccordionProps as MuiAccordionProps, TypographyProps } from '@mui/material';
import { SpacingProps, RadiusProps, SizeProps } from '@/components/styles';

/**
 * Raiz estilizada do accordion. Valores padrão do *shell* (só aplicados quando a prop correspondente não é passada):
 * - `m` padrão `1` (theme spacing)
 * - `radius` padrão `true` (usa `theme.shape.borderRadius` via estilos globais)
 * Quando `m` não é informado, o estado expandido zera a margem extra padrão do MUI (`&.Mui-expanded`).
 */
export interface AccordionProps extends Omit<MuiAccordionProps, 'children' | 'title'>, SpacingProps, RadiusProps, SizeProps {
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
