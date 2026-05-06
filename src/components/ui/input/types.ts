import { ReactNode } from 'react';
import { TextFieldProps } from '@mui/material';

import { SizeProps, RadiusProps, SpacingProps, SPACING_PROPS, SIZE_PROPS, RADIUS_PROPS } from '@/components/styles';

type ConflictingProps = typeof SPACING_PROPS[number] | typeof SIZE_PROPS[number] | typeof RADIUS_PROPS[number];

export type MaskType = 'cpf' | 'cnpj' | 'cpfCnpj' | 'phone' | 'cardNumber' | 'expiryDate' | 'cep' | 'currency';

export interface Props extends Omit<TextFieldProps, ConflictingProps>, RadiusProps, SizeProps, SpacingProps {
    /** Exibe o label acima do input (ao invés do label flutuante interno do TextField). */
    inputLabel?: string;

    /** 
     * Texto de erro exibido abaixo do input. 
     * Se essa prop for passada (mesmo sendo undefined), o espaço dele será reservado no layout.
     */
    errorText?: string;

    /** Cor de fundo customizada. Se true, usa o background.default. Se string, usa o valor como cor CSS ou path do tema. */
    bgcolor?: boolean | string;

    /** Se true, aplica o background paper do tema. */
    paper?: boolean;

    /** Ícone exibido à esquerda (início). Puxa a cor do atributo color se definida no Input. */
    icon?: ReactNode;

    /** Ícone exibido à direita (fim). Puxa a cor do atributo color se definida. */
    iconRight?: ReactNode;

    /** Modo senha: Se true, adiciona o olhinho interagível que altera o tipo do campo. */
    password?: boolean;

    /** Aplica formatação automática do texto e define propriedades máximas de limite. */
    mask?: MaskType;

    /** Se true, adiciona o texto "(Opcional)" ao lado do inputLabel. */
    optional?: boolean;
}
