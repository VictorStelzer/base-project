import { DividerProps } from "@mui/material";

import { SpacingProps } from "@/components/styles";

export interface Props extends DividerProps, SpacingProps {
    /** Cor da linha (caminho do tema, ex: 'primary.main') */
    color?: string;
    /** Espessura da linha */
    thickness?: number | string;
    /** Comprimento da linha (width se horizontal, height se vertical) */
    size?: number | string;
    /** Atalho para orientation="vertical" */
    vertical?: boolean;
    /** Arredonda as bordas */
    radius?: boolean;
}