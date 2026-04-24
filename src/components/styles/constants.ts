/**
 * Constantes compartilhadas para shouldForwardProp.
 * Listam todas as props customizadas que NÃO devem ser passadas ao DOM.
 */

export const SPACING_PROPS = [
    'p', 'pr', 'pl', 'pt', 'pb', 'px', 'py',
    'm', 'ml', 'mr', 'mt', 'mb', 'mx', 'my',
] as const;

export const FLEX_PROPS = [
    'displayFlex', 'row', 'column', 'center', 'between', 'around',
    'evenly', 'full', 'gap',
] as const;

export const RADIUS_PROPS = [
    'radius', 'circle', 'square',
] as const;

export const LAYOUT_PROPS = [
    ...FLEX_PROPS,
    ...RADIUS_PROPS,
] as const;

export const HOVER_PROPS = ['hover'] as const;

export const SIZE_PROPS = ['height', 'width'] as const;
