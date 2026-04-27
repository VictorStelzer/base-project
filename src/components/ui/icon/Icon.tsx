import React from 'react';

import { Props } from "./types";

import { Box } from "@/components";

import { getColor } from "@/components/styles";

import { useTheme, alpha } from '@mui/material/styles';


export const Icon: React.FC<Props> = ({ icon, color = 'primary.main', size = 24, bg, sx, ...props }) => {
    const theme = useTheme();

    const resolvedColor = getColor(theme, color) || theme.palette.primary.main;
    const backgroundColor = typeof bg === 'string' ? bg : bg === true ? alpha(resolvedColor, 0.1) : undefined;

    return (
        <Box
            displayFlex="center"
            bgcolor={backgroundColor}
            {...(bg && {
                radius: props.radius ?? 12,
                p: props.p ?? 0.5
            })}
            {...props}
            sx={{
                display: 'inline-flex',
                '& svg, & .MuiSvgIcon-root': { color: color, fontSize: size },
                ...sx
            }}
        >
            {icon}
        </Box>
    );
};


export default Icon;
