/**
 * Tipos compartilhados para as props de estilo dos componentes de UI.
 * Cada componente pode ter suas próprias extensões desses tipos base.
 */

export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ResponsiveProp<T> = T | Partial<Record<BreakpointKey, T>>;


/** Props de espaçamento comuns a todos os componentes customizados. */
export interface SpacingProps {
    p?: ResponsiveProp<boolean | number | string>;
    pr?: ResponsiveProp<string | number>;
    pl?: ResponsiveProp<string | number>;
    pt?: ResponsiveProp<string | number>;
    pb?: ResponsiveProp<string | number>;
    px?: ResponsiveProp<string | number>;
    py?: ResponsiveProp<string | number>;
    m?: ResponsiveProp<string | number>;
    ml?: ResponsiveProp<string | number>;
    mr?: ResponsiveProp<string | number>;
    mt?: ResponsiveProp<string | number>;
    mb?: ResponsiveProp<string | number>;
    mx?: ResponsiveProp<string | number>;
    my?: ResponsiveProp<string | number>;
}

/** Props de arredondamento compartilhadas. */
export interface RadiusProps {
    radius?: boolean | number;
    circle?: boolean;
    square?: boolean;
}

/** Props de dimensão compartilhadas. */
export interface SizeProps {
    height?: ResponsiveProp<string | number>;
    width?: ResponsiveProp<string | number>;
}

/** Props de layout flexbox e dimensões completas. */
export interface FlexProps {
    displayFlex?: boolean | 'row' | 'column' | 'center';
    row?: boolean | BreakpointKey;
    column?: boolean | BreakpointKey;
    center?: boolean;
    between?: boolean;
    around?: boolean;
    evenly?: boolean;
    full?: boolean;
    justifyContent?: ResponsiveProp<boolean | "center" | "space-between" | "space-around" | "space-evenly" | "flex-start" | "flex-end">;
    alignItems?: ResponsiveProp<boolean | "center" | "space-between" | "space-around" | "space-evenly" | "flex-start" | "flex-end">;
    gap?: ResponsiveProp<number | string>;
}

/** Props de visibilidade responsiva — esconde o componente acima ou abaixo de um breakpoint. */
export interface VisibilityProps {
    /** Esconde o componente a partir do breakpoint (inclusive para cima). Ex: hideUp="md" esconde em md, lg, xl. */
    hideUp?: BreakpointKey;
    /** Esconde o componente abaixo do breakpoint. Ex: hideDown="md" esconde em xs, sm. */
    hideDown?: BreakpointKey;
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

/** Props de posicionamento comuns. */
export interface PositionStyleProps {
    position?: ResponsiveProp<'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'>;
    top?: ResponsiveProp<string | number>;
    left?: ResponsiveProp<string | number>;
    right?: ResponsiveProp<string | number>;
    bottom?: ResponsiveProp<string | number>;
    zIndex?: ResponsiveProp<number>;
}

/** Props de tipografia comuns. */
export interface TypographyStyleProps {
    fontSize?: ResponsiveProp<string | number>;
    fontWeight?: ResponsiveProp<string | number>;
    textAlign?: ResponsiveProp<'left' | 'center' | 'right' | 'justify' | 'inherit'>;
    letterSpacing?: ResponsiveProp<string | number>;
    lineHeight?: ResponsiveProp<string | number>;
}
