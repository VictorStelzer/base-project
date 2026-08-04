import type { Dayjs } from 'dayjs';

import { SpacingProps, RadiusProps, VisibilityProps } from '@/components/styles';

export interface InputDateProps extends RadiusProps, SpacingProps, VisibilityProps {
    value: Dayjs | null;
    onChange: (value: Dayjs | null) => void;

    /** Exibe o label acima do picker (ao invés do label flutuante interno). */
    inputLabel?: string;
    /** Texto de erro exibido abaixo do picker. Se passado (mesmo undefined), reserva o espaço no layout. */
    errorText?: string;

    /** Cor de fundo customizada. Se true, usa o background.default. Se string, usa como cor CSS ou path do tema. */
    bgcolor?: boolean | string;
    /** Se true, aplica o background paper do tema. */
    paper?: boolean;
    /** Cor do ícone de calendário. Padrão: a mesma cor da borda quando o campo está ativo (primary). */
    iconColor?: string;

    required?: boolean;
    /** Se true, adiciona o texto "(Opcional)" ao lado do inputLabel. */
    optional?: boolean;
    disabled?: boolean;
    /** Ocupa 100% da largura do container. */
    fullWidth?: boolean;

    width?: string | number;
    height?: string | number;

    minDate?: Dayjs;
    maxDate?: Dayjs;

    /** Formato de exibição/parsing (dayjs). Padrão: "DD/MM". */
    format?: string;
}
