import { IconButtonProps } from '@mui/material';
import { BaseHoverProps, SpacingProps, SizeProps, RadiusProps, FlexProps } from '@/components/styles';

/** HoverProps do IconButton — suporta shadow, bg, color, border e scale. */
export interface HoverProps extends Pick<BaseHoverProps, 'shadow' | 'bgcolor' | 'color' | 'borderColor' | 'borderWidth' | 'scale' | 'opacity'> {}

/**
 * Propriedades do componente IconButton, mesclando MUI com as nossas customizações.
 */
export interface Props extends Omit<IconButtonProps, 'size'>, SpacingProps, SizeProps, RadiusProps, FlexProps {
    /** Efeito de hover. Se true, aplica um efeito padrão. Se objeto, aplica propriedades customizadas. */
    hover?: boolean | HoverProps;
    /** Tamanho do ícone */
    size?: number | string;
}
