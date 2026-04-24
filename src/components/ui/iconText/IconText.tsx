import React from 'react';

import { Props } from './types';

import { Text, Box } from '@/components';

import { getColor } from '@/components/styles';

import { useTheme } from '@mui/material/styles';

export const IconText: React.FC<Props> = ({ icon, color, size, children, ...textProps }) => {
    const theme = useTheme();

    const iconColor = icon.color ? getColor(theme, icon.color) : (color ? getColor(theme, color) : theme.palette.primary.main);
    const iconSize = icon.size || size || '1.25rem';
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
                {icon.icon}
            </Box>
            <Text {...textProps} sx={{ color: textColor, fontSize: textSize, ...textProps.sx }}>
                {children}
            </Text>
        </Box>
    );
};
