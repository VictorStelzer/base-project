import { ChipProps as MuiChipProps } from "@mui/material";

import { BaseHoverProps, HOVER_PROPS, SIZE_PROPS, SizeProps, SPACING_PROPS, SpacingProps } from "@/components/styles";

interface HoverProps extends Pick<BaseHoverProps, 'shadow' | 'shadowColor' | 'bgcolor' | 'color' | 'borderColor' | 'borderWidth' | 'scale' | 'opacity'> { }

type ConflictingProps = typeof HOVER_PROPS[number] | typeof SIZE_PROPS[number] | typeof SPACING_PROPS[number];

export interface ChipProps extends Omit<MuiChipProps, ConflictingProps>, SizeProps, SpacingProps {
    hover?: boolean | HoverProps;
    textColor?: string;
}