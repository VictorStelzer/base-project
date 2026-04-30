import React from "react";

import { Props } from "./types";

import { Box } from "@/components";

import { Container as ContainerMUI } from "@mui/material";

export const Container: React.FC<Props> = ({ children, ...props }) => {
    return (
        <Box {...props}>
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
                >
                    {children}
                </Box>
            </ContainerMUI>
        </Box>
    )
}