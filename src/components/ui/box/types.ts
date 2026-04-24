import { BoxProps } from '@mui/material';
import { BaseHoverProps, SpacingProps, FlexProps, RadiusProps, SPACING_PROPS, FLEX_PROPS } from '@/components/styles';

/** HoverProps do Box — inclui shadowColor por suportar sombra colorida. */
export interface HoverProps extends Pick<BaseHoverProps, 'shadow' | 'shadowColor' | 'bg' | 'color' | 'borderColor' | 'borderWidth' | 'scale' | 'opacity'> {}

type ConflictingProps = typeof SPACING_PROPS[number] | typeof FLEX_PROPS[number];

/**
 * Propriedades do componente Box, mesclando MUI com as nossas customizações.
 */
export interface Props extends Omit<BoxProps, ConflictingProps>, SpacingProps, FlexProps, RadiusProps {
    /** Sombras pré-definidas do MUI. Se true, usa shadow 4. Se number, usa o índice da sombra (0-24). */
    shadow?: boolean | number;
    /** Cor da sombra. Aceita caminhos do tema. */
    shadowColor?: string;
    /** Sombra secundária (suave, índice 1) */
    shadowSecondary?: boolean;
    /** Se true, aplica a cor de fundo 'paper' do tema */
    paper?: boolean;
    /** Efeito de hover. Se true, aplica um efeito padrão. Se objeto, aplica propriedades customizadas. */
    hover?: boolean | HoverProps;
    /** Cor de fundo customizada acessando o theme (ex: primary.main) */
    bgColor?: string;
}
