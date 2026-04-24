import { TypographyProps } from '@mui/material';
import { SpacingProps, SizeProps, SPACING_PROPS, SIZE_PROPS } from '@/components/styles';

export interface GradientProps {
    from: string;
    to: string;
    dir?: string; // Ex: '45deg', 'to right'
}

type ConflictingProps = typeof SPACING_PROPS[number] | typeof SIZE_PROPS[number];

/**
 * Propriedades do componente Text, mesclando MUI com as nossas customizações.
 */
export interface Props extends Omit<TypographyProps, ConflictingProps>, SpacingProps, SizeProps {
    /** Limita o texto a um número específico de linhas e adiciona reticências (ellipsis). */
    truncate?: number;
    /** Aplica um efeito de gradiente no texto. Aceita true (gradiente padrão) ou um objeto com especificações.*/
    gradient?: boolean | GradientProps;
}
