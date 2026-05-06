import React from "react";

import { Props } from "./types";

import { Box } from "@/components";

import { Container as ContainerMUI } from "@mui/material";

export const Container: React.FC<Props> = ({ children, sx, ...props }) => {
    return (
        <Box {...props} p px={1}>
            <ContainerMUI maxWidth="xl" sx={{ height: '100%' }}>
                <Box
                    displayFlex
                    full
                    row={props.row}
                    column={props.column}
                    center={props.center}
                    between={props.between}
                    around={props.around}
                    evenly={props.evenly}
                    justifyContent={props.justifyContent}
                    alignItems={props.alignItems}
                    gap={props.gap}
                    sx={sx}
                >
                    {children}
                </Box>
            </ContainerMUI>
        </Box>
    )
}