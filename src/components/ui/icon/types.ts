import { BoxProps } from "@/components";


/**
 * Propriedades do componente Icon.
 * Estende as propriedades do Box, permitindo customizações de layout e espaçamento,
 * mas omite 'color' para evitar conflitos com a cor do ícone.
 */
export interface IconProps extends Omit<BoxProps, 'color'> {
    /** 
     * O ícone que será renderizado dentro do componente. 
     * Pode ser um componente de ícone (ex: Lucide, MUI) ou um elemento SVG.
     */
    icon: React.ReactNode;

    /** 
     * A cor que será aplicada ao ícone. 
     * Aceita valores hexadecimais ou caminhos do tema (ex: 'primary.main').
     */
    color?: string;

    /** 
     * O tamanho do ícone. 
     * Aceita números (px) ou strings (ex: '1.5rem').
     */
    size?: string | number;

    /** 
     * Define o fundo do ícone.
     * - Se true: aplica uma versão suave (15% de opacidade) da cor definida em 'color'.
     * - Se string: aplica a cor informada (aceita caminhos do tema).
     */
    bg?: boolean | string;
}
