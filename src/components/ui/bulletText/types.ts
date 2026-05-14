import { TextProps } from '@/components';

export interface BulletSettings {
    color?: string;
    size?: string | number;
    gap?: string | number;
}

/**
 * Propriedades do componente BulletText, mesclando MUI com as nossas customizações.
 */
export interface BulletTextProps extends Omit<TextProps, 'color'> {
    /** Cor geral (aplica-se ao bullet e ao texto a menos que sobrescrita na prop bullet) */
    color?: string;
    /** Tamanho geral do texto */
    size?: string | number;
    /** Configurações específicas do bullet */
    bullet?: BulletSettings;
}
