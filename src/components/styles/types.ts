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
    row?: boolean | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    column?: boolean | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    center?: boolean;
    between?: boolean;
    around?: boolean;
    evenly?: boolean;
    full?: boolean;
    justifyContent?: boolean;
    alignItems?: boolean;
    gap?: ResponsiveProp<number | string>;
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
