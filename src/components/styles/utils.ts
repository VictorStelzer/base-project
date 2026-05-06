import { Theme } from '@mui/material';

import { CSSObject, alpha } from '@mui/material/styles';

import { SpacingProps, RadiusProps, BaseHoverProps, FlexProps, SizeProps, BreakpointKey } from './types';

/**
 * Helper para agrupar e mesclar estilos responsivos (objetos { xs, sm, md, lg, xl })
 * em um único CSSObject sem sobrescrever media queries.
 */
export const applyResponsiveStyles = (
    theme: Theme,
    configs: { value: any; getStyles: (val: any) => CSSObject }[]
): CSSObject => {
    const result: CSSObject = {};
    const breakpoints: BreakpointKey[] = ['xs', 'sm', 'md', 'lg', 'xl'];

    configs.forEach(({ value, getStyles }) => {
        if (value === undefined) return;

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            breakpoints.forEach((bp) => {
                if (value[bp] !== undefined) {
                    const styles = getStyles(value[bp]);
                    if (bp === 'xs') {
                        Object.assign(result, styles);
                    } else {
                        const mq = theme.breakpoints.up(bp);
                        result[mq] = {
                            ...(result[mq] as CSSObject || {}),
                            ...styles
                        };
                    }
                }
            });
        } else {
            Object.assign(result, getStyles(value));
        }
    });

    return result;
};

/**
 * Helper para aplicar cor às sombras.
 */
export const applyColorToShadow = (shadowStr: string, colorHex?: string) => {
    if (!shadowStr || shadowStr === 'none' || !colorHex) return shadowStr;
    try {
        const colorWithAlpha = alpha(colorHex, 0.4);
        return shadowStr.replace(/rgba?\([^)]+\)/g, colorWithAlpha);
    } catch {
        return shadowStr.replace(/rgba?\([^)]+\)/g, colorHex);
    }
};

/**
 * Helper para resolver caminhos de cores no tema do Material UI (ex: "primary.main").
 * Útil para aplicar cores dinâmicas em objetos de estilo que não as resolvem automaticamente.
 * 
 * @param theme O objeto de tema do MUI.
 * @param colorPath O caminho da cor na paleta (ex: 'primary.dark').
 * @returns A cor resolvida (string hex/rgb) ou o próprio caminho original caso não seja encontrado.
 */
export const getColor = (theme: Theme, colorPath?: string): string | undefined => {
    if (!colorPath) return undefined;

    // Divide o caminho (ex: 'primary.main' -> ['primary', 'main'])
    const parts = colorPath.split('.');
    let result: unknown = theme.palette;

    for (const part of parts) {
        if (result && typeof result === 'object' && part in (result as Record<string, unknown>)) {
            result = (result as Record<string, unknown>)[part];
        } else {
            // Se o caminho quebrar, retorna o que recebeu (pode ser uma cor CSS válida como 'red' ou '#fff')
            return colorPath;
        }
    }

    return typeof result === 'string' ? result : colorPath;
};

/**
 * Gera os estilos de espaçamento (padding/margin).
 * O `p` booleano (true = 20px) é suportado para Box e Paper.
 * Para Button, IconButton e TextButton, `p` deve ser number | string.
 */
export const getSpacingStyles = (theme: Theme, props: SpacingProps): CSSObject => {
    const sp = (v: string | number | boolean): string | number => {
        if (v === true) return '20px';
        if (v === false) return 0;
        if (typeof v === 'number') return theme.spacing(v);
        return v;
    };

    return applyResponsiveStyles(theme, [
        { value: props.p, getStyles: (v) => ({ padding: sp(v) }) },
        { value: props.pr, getStyles: (v) => ({ paddingRight: sp(v) }) },
        { value: props.pl, getStyles: (v) => ({ paddingLeft: sp(v) }) },
        { value: props.pt, getStyles: (v) => ({ paddingTop: sp(v) }) },
        { value: props.pb, getStyles: (v) => ({ paddingBottom: sp(v) }) },
        { value: props.px, getStyles: (v) => ({ paddingLeft: sp(v), paddingRight: sp(v) }) },
        { value: props.py, getStyles: (v) => ({ paddingTop: sp(v), paddingBottom: sp(v) }) },
        { value: props.m, getStyles: (v) => ({ margin: sp(v) }) },
        { value: props.mr, getStyles: (v) => ({ marginRight: sp(v) }) },
        { value: props.ml, getStyles: (v) => ({ marginLeft: sp(v) }) },
        { value: props.mt, getStyles: (v) => ({ marginTop: sp(v) }) },
        { value: props.mb, getStyles: (v) => ({ marginBottom: sp(v) }) },
        { value: props.mx, getStyles: (v) => ({ marginLeft: sp(v), marginRight: sp(v) }) },
        { value: props.my, getStyles: (v) => ({ marginTop: sp(v), marginBottom: sp(v) }) },
    ]);
};

/**
 * Gera os estilos de borda arredondada.
 */
export const getRadiusStyles = (theme: Theme, props: RadiusProps): CSSObject => {
    if (props.circle) return { borderRadius: '50%' };
    if (props.square) return { borderRadius: 0 };
    if (props.radius !== undefined) {
        return { borderRadius: typeof props.radius === 'number' ? props.radius : theme.shape.borderRadius };
    }
    return {};
};

/**
 * Gera os estilos de dimensão (altura/largura).
 */
export const getSizeStyles = (theme: Theme, props: SizeProps): CSSObject => {
    return applyResponsiveStyles(theme, [
        { value: props.height, getStyles: (v) => ({ height: v }) },
        { value: props.width, getStyles: (v) => ({ width: v }) },
    ]);
};

/**
 * Gera os estilos de layout Flexbox.
 */
export const getFlexStyles = (theme: Theme, props: FlexProps): CSSObject => {
    const isFlex =
        props.displayFlex !== undefined ||
        props.row !== undefined ||
        props.column !== undefined ||
        props.center ||
        props.between ||
        props.around ||
        props.evenly ||
        props.justifyContent ||
        props.alignItems ||
        props.gap !== undefined;

    let flexDirectionValue: any = undefined;
    if (isFlex) {
        if (typeof props.row === 'string') {
            flexDirectionValue = { xs: 'column', [props.row]: 'row' };
        } else if (typeof props.column === 'string') {
            flexDirectionValue = { xs: 'row', [props.column]: 'column' };
        } else {
            flexDirectionValue = (props.column || props.displayFlex === 'column') ? 'column' : 'row';
        }
    }

    return {
        ...(isFlex && { display: 'flex' }),
        ...applyResponsiveStyles(theme, [
            { value: flexDirectionValue, getStyles: (v) => ({ flexDirection: v }) },
            { value: props.gap, getStyles: (v) => ({ gap: typeof v === 'number' ? theme.spacing(v) : v }) }
        ]),
        ...(props.justifyContent && { justifyContent: 'center' }),
        ...(props.alignItems && { alignItems: 'center' }),
        ...((props.center || props.displayFlex === 'center') && {
            justifyContent: 'center',
            alignItems: 'center'
        }),
        ...(props.between && { justifyContent: 'space-between' }),
        ...(props.around && { justifyContent: 'space-around' }),
        ...(props.evenly && { justifyContent: 'space-evenly' }),
        ...(props.full && { width: '100%', height: '100%' }),
    };
};

/**
 * Gera os estilos de hover.
 * Aceita o `BaseHoverProps` mais amplo — cada componente declara seu próprio
 * HoverProps restrito em seu types.ts e passa aqui.
 * O argumento `hover` pode ser boolean (efeito padrão) ou um objeto com propriedades.
 */
export const getHoverStyles = (
    theme: Theme,
    hover: boolean | BaseHoverProps | undefined,
): CSSObject => {
    if (!hover) return {};

    const isObject = typeof hover === 'object';

    // Base styles para transição suave de borda sem perder o radius e sem piscar em preto
    const baseBorderStyles = isObject && hover.borderColor ? {
        borderStyle: 'solid',
        borderWidth: `${hover.borderWidth || 1}px`,
        borderColor: 'transparent',
    } : {};

    // Adiciona overflow hidden na box e transição nos filhos para o efeito de "zoom interno"
    const zoomStyles = isObject && hover.zoom ? {
        overflow: 'hidden',
        '& > *': {
            transition: 'transform 0.2s ease-in-out',
        }
    } : {};

    return {
        ...baseBorderStyles,
        ...zoomStyles,
        transition: 'all 0.2s ease-in-out',
        '&:hover': isObject ? {
            ...((hover.shadow !== undefined || hover.shadowColor) && {
                boxShadow: hover.shadowColor
                    ? applyColorToShadow(theme.shadows[hover.shadow ?? 6], getColor(theme, hover.shadowColor))
                    : theme.shadows[hover.shadow as number]
            }),
            ...(hover.bgcolor && { backgroundColor: getColor(theme, hover.bgcolor) }),
            ...(hover.color && { color: getColor(theme, hover.color) }),
            ...(hover.textColor && { color: getColor(theme, hover.textColor) }),
            ...(hover.opacity !== undefined && { opacity: hover.opacity }),
            ...(hover.borderColor && {
                borderColor: getColor(theme, hover.borderColor),
            }),
            ...(hover.scale && { transform: `scale(${hover.scale})` }),
            ...(hover.zoom && {
                '& > *': {
                    transform: `scale(${hover.zoom})`,
                }
            }),
        } : {
            boxShadow: theme.shadows[6],
        },
    };
};
