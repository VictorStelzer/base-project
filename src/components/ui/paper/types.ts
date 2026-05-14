import { PaperProps as PaperPropsMUI } from '@mui/material';
import { BaseHoverProps, SpacingProps, SizeProps, FlexProps, RadiusProps, SPACING_PROPS, FLEX_PROPS, SIZE_PROPS } from '@/components/styles';

/** HoverProps do Paper — suporta shadow, bgcolor, color, border e scale. */
interface HoverProps extends Pick<BaseHoverProps, 'shadow' | 'bgcolor' | 'color' | 'borderColor' | 'borderWidth' | 'scale' | 'opacity'> {}

type ConflictingProps = typeof SPACING_PROPS[number] | typeof FLEX_PROPS[number] | typeof SIZE_PROPS[number];

/**
 * Propriedades do componente Paper, mesclando MUI com as nossas customizações.
 */
export interface PaperProps extends Omit<PaperPropsMUI, ConflictingProps>, SpacingProps, SizeProps, FlexProps, RadiusProps {
    /** Efeito de hover. Se true, aplica um efeito padrão. Se objeto, aplica propriedades customizadas. */
    hover?: boolean | HoverProps;
    /** Cor de fundo customizada acessando o theme (ex: primary.main) */
    bgcolor?: string;
    /** Efeito de vidro fosco (glassmorphism) */
    glass?: boolean;
}
