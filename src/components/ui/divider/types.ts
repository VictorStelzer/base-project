import { DividerProps as MuiDividerProps } from "@mui/material";

import { SpacingProps } from "@/components/styles";

export interface DividerProps extends MuiDividerProps, SpacingProps {
    /** Cor da linha (caminho do tema, ex: 'primary.main'). Se omitido, usa `theme.palette.divider`. */
    color?: string;
    /** Espessura do traço (horizontal: `border-bottom-width`; vertical: `border-right-width`). Padrão: 1px. */
    thickness?: number | string;
    /** Comprimento do traço: horizontal = largura (`width`), vertical = altura (`height`). Padrão: 100% da área flex. */
    size?: number | string;
    /** Atalho para orientation="vertical" */
    vertical?: boolean;
    /** Arredonda as bordas */
    radius?: boolean;
}