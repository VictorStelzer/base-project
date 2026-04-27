import React from 'react';

import { Props } from './types';

import { Text, Box } from '@/components';

import { getColor } from '@/components/styles';

import { useTheme } from '@mui/material/styles';

export const IconText: React.FC<Props> = ({ icon, color, size, children, ...textProps }) => {
    const theme = useTheme();

    const iconColor = icon.color ? getColor(theme, icon.color) : (color ? getColor(theme, color) : theme.palette.primary.main);
    const iconSize = icon.size || (typeof size === 'number' ? size + 4 : 16);
    const textColor = color ? getColor(theme, color) : undefined;
    const textSize = size;
    const gap = icon.gap ?? 1;

    const flexDirection =
        icon.position === 'top' ? 'column' :
            icon.position === 'bottom' ? 'column-reverse' :
                icon.position === 'right' ? 'row-reverse' :
                    'row';

    const isVertical = icon.position === 'top' || icon.position === 'bottom';

    return (
        <Box
            displayFlex
            gap={gap}
            sx={{
                display: 'inline-flex',
                width: 'fit-content',
                flexDirection,
                alignItems: 'center',
                justifyContent: isVertical ? 'center' : 'flex-start',
                textAlign: isVertical ? 'center' : 'left',
            }}
        >
        <Box center sx={{ color: iconColor, fontSize: iconSize, display: 'flex', '& .MuiSvgIcon-root': { fontSize: 'inherit' } }}>
                {React.isValidElement(icon.icon) 
                    ? React.cloneElement(icon.icon as React.ReactElement<any>, {
                        ...(icon.color || color ? { color: icon.color || color } : {}),
                        ...(icon.size || size ? { size: icon.size || size } : {}),
                    })
                    : icon.icon}
            </Box>
            <Text {...textProps} sx={{ color: textColor, fontSize: textSize, ...textProps.sx }}>
                {children}
            </Text>
        </Box>
    );
};
