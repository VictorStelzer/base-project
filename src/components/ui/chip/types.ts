import { ChipProps as MuiChipProps } from "@mui/material";

import { BaseHoverProps, HOVER_PROPS, SIZE_PROPS, SizeProps, SPACING_PROPS, SpacingProps, VISIBILITY_PROPS, VisibilityProps } from "@/components/styles";

type HoverProps = Pick<BaseHoverProps, 'shadow' | 'shadowColor' | 'bgcolor' | 'color' | 'borderColor' | 'borderWidth' | 'scale' | 'opacity'>;

type ConflictingProps = typeof HOVER_PROPS[number] | typeof SIZE_PROPS[number] | typeof SPACING_PROPS[number] | typeof VISIBILITY_PROPS[number];

export interface ChipProps extends Omit<MuiChipProps, ConflictingProps>, SizeProps, SpacingProps, VisibilityProps {
    hover?: boolean | HoverProps;
    textColor?: string;
}