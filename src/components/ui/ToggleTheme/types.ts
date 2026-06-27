import { SpacingProps, SizeProps, FlexProps, PositionStyleProps } from '@/components/styles';

export interface ToggleThemeProps extends SpacingProps, SizeProps, FlexProps, PositionStyleProps {
    /** Se true, renderiza como um Switch. Caso contrário, como um IconButton. */
    switch?: boolean;
    /** Estilos CSS adicionais */
    style?: React.CSSProperties;
    /** Classe CSS adicional */
    className?: string;
}

