import React from "react";

import { Props } from "./types";

import { Box } from "@/components";

import { Container as ContainerMUI } from "@mui/material";

export const Container: React.FC<Props> = ({ children, ...props }) => {
    return (
        <Box {...props} px={1} p>
            <ContainerMUI maxWidth="xl">
                {children}
            </ContainerMUI>
        </Box>
    )
}