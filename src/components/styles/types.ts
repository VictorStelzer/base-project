/**
 * Tipos compartilhados para as props de estilo dos componentes de UI.
 * Cada componente pode ter suas próprias extensões desses tipos base.
 */

/** Props de espaçamento comuns a todos os componentes customizados. */
export interface SpacingProps {
    p?: boolean | number | string;
    pr?: string | number;
    pl?: string | number;
    pt?: string | number;
    pb?: string | number;
    px?: string | number;
    py?: string | number;
    m?: string | number;
    ml?: string | number;
    mr?: string | number;
    mt?: string | number;
    mb?: string | number;
    mx?: string | number;
    my?: string | number;
}

/** Props de arredondamento compartilhadas. */
export interface RadiusProps {
    radius?: boolean | number;
    circle?: boolean;
    square?: boolean;
}

/** Props de dimensão compartilhadas. */
export interface SizeProps {
    height?: string | number;
    width?: string | number;
}

/** Props de layout flexbox e dimensões completas. */
export interface FlexProps {
    displayFlex?: boolean | 'row' | 'column' | 'center';
    row?: boolean;
    column?: boolean;
    center?: boolean;
    between?: boolean;
    around?: boolean;
    evenly?: boolean;
    full?: boolean;
    gap?: number | string;
}

/**
 * Tipo base de HoverProps — conjunto máximo de propriedades possíveis.
 * Cada componente DEVE definir seu próprio HoverProps em seu types.ts,
 * selecionando apenas as propriedades que fazem sentido para ele.
 */
export interface BaseHoverProps {
    shadow?: number;
    shadowColor?: string;
    bgcolor?: string;
    color?: string;
    textColor?: string;
    borderColor?: string;
    borderWidth?: number;
    scale?: number;
    zoom?: number;
    opacity?: number;
}
