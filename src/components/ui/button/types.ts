import { ButtonProps } from '@mui/material';
import { BaseHoverProps, SpacingProps, SizeProps, RadiusProps, FlexProps } from '@/components/styles';

/** HoverProps do Button — color afeta o fundo (bgcolor), textColor afeta a cor do texto. */
export interface HoverProps extends Pick<BaseHoverProps, 'shadow' | 'color' | 'textColor' | 'borderColor' | 'borderWidth' | 'scale' | 'opacity'> {}

/**
 * Propriedades do componente Button, mesclando MUI com as nossas customizações.
 */
export interface Props extends ButtonProps, SpacingProps, SizeProps, RadiusProps, FlexProps {
    /** Cor do texto. Aceita caminhos do tema (ex: 'primary.main') ou cores CSS. */
    textColor?: string;
    /** Efeito de hover. Se objeto, aplica propriedades customizadas. */
    hover?: HoverProps;
    /** Transforma o texto do botão em maiúsculo */
    uppercase?: boolean;
    /** Tamanho da fonte */
    fontSize?: string | number;
    /** Peso da fonte */
    fontWeight?: string | number;
    /** Exibe um spinner de carregamento e desativa o botão */
    loading?: boolean;
}
