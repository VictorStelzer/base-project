import { LinkProps as MuiLinkProps } from '@mui/material';
import { LinkProps as RouterLinkProps } from 'react-router-dom';
import { BaseHoverProps, SpacingProps, SizeProps, FlexProps, SPACING_PROPS, SIZE_PROPS, FLEX_PROPS } from '@/components/styles';

/** HoverProps do TextButton — simplificado: só cor, escala e opacidade. */
export interface HoverProps extends Pick<BaseHoverProps, 'color' | 'scale' | 'opacity'> {}

type ConflictingProps = typeof SPACING_PROPS[number] | typeof SIZE_PROPS[number] | typeof FLEX_PROPS[number] | 'to';

/**
 * Propriedades do componente TextButton, mesclando MUI com RouterLink e nossas customizações.
 */
export interface Props extends
    Omit<MuiLinkProps, ConflictingProps>,
    Omit<Partial<RouterLinkProps>, 'color'>,
    SpacingProps,
    SizeProps,
    FlexProps
{
    /** Efeito de hover. Se objeto, aplica propriedades customizadas. */
    hover?: HoverProps;
}
