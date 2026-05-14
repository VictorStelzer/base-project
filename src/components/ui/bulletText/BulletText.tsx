import React from 'react';

import { BulletTextProps } from './types';

import { Text, Box } from '@/components';
import { getColor } from '@/components/styles';

import { useTheme } from '@mui/material/styles';

export const BulletText: React.FC<BulletTextProps> = ({ bullet = {}, color, size, children, ...textProps }) => {
    const theme = useTheme();

    const bulletColor = bullet.color ? getColor(theme, bullet.color) : (color ? getColor(theme, color) : theme.palette.text.primary);
    const bulletSize = bullet.size || '6px';
    const textColor = color ? getColor(theme, color) : undefined;
    const textSize = size;
    const gap = bullet.gap ?? 1;

    return (
        <Box row gap={gap} alignItems>
            <Box
                width={bulletSize}
                height={bulletSize}
                circle
                bgcolor={bulletColor}
                sx={{ minWidth: bulletSize }}
            />
            <Text {...textProps} sx={{ color: textColor, fontSize: textSize, ...textProps.sx }}>
                {children}
            </Text>
        </Box>
    );
};
