import React from 'react';
import { 
    Accordion as MuiAccordion, 
    AccordionSummary as MuiAccordionSummary, 
    AccordionDetails as MuiAccordionDetails, 
    Typography
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Props } from './types';
import { 
    getSpacingStyles, 
    getRadiusStyles, 
    getSizeStyles, 
    getColor, 
    SPACING_PROPS, 
    RADIUS_PROPS, 
    SIZE_PROPS 
} from '@/components/styles';

const StyledAccordion = styled(MuiAccordion, {
    shouldForwardProp: (prop) => 
        !([...SPACING_PROPS, ...RADIUS_PROPS, ...SIZE_PROPS, 'bgcolor', 'radius', 'divider'] as string[]).includes(prop as string)
})<Partial<Props>>(({ theme, ...props }) => ({
    backgroundColor: props.bgcolor ? getColor(theme, props.bgcolor) : theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    '&:before': {
        display: 'none',
    },
    ...getRadiusStyles(theme, props as any),
    ...getSpacingStyles(theme, props as any),
    ...getSizeStyles(theme, props as any),
    overflow: 'hidden',
    transition: 'all 0.3s ease-in-out',
    '&.Mui-expanded': {
        margin: props.m !== undefined ? undefined : 0, // Remove o crescimento padrão do MUI
    },
}));

const StyledSummary = styled(MuiAccordionSummary)(({ theme }) => ({
    backgroundColor: 'transparent',
    '& .MuiAccordionSummary-content': {
        margin: theme.spacing(1.5, 0),
    },
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(180deg)',
    },
}));

const StyledDetails = styled(MuiAccordionDetails, {
    shouldForwardProp: (prop) => prop !== 'divider'
})<{ divider?: boolean }>(({ theme, divider }) => ({
    padding: theme.spacing(2),
    borderTop: divider ? `1px solid ${theme.palette.divider}` : 'none',
}));

export const Accordion: React.FC<Props> = ({ 
    title, 
    children, 
    titleColor, 
    titleStyle, 
    textColor, 
    textStyle, 
    icon, 
    iconColor, 
    iconPosition = 'end',
    divider = false,
    ...props 
}) => {
    const theme = useTheme();

    return (
        <StyledAccordion disableGutters {...props} radius m={1}>
            <StyledSummary
                expandIcon={icon || <ExpandMoreIcon sx={{ color: iconColor ? getColor(theme, iconColor) : undefined }} />}
                sx={{
                    flexDirection: iconPosition === 'start' ? 'row-reverse' : 'row',
                    '& .MuiAccordionSummary-expandIconWrapper': {
                        marginLeft: iconPosition === 'end' ? 1 : 0,
                        marginRight: iconPosition === 'start' ? 1 : 0,
                    }
                }}
            >
                {typeof title === 'string' ? (
                    <Typography 
                        variant="subtitle1" 
                        fontWeight="600"
                        {...titleStyle}
                        sx={{ 
                            color: titleColor ? getColor(theme, titleColor) : 'text.primary',
                            ...titleStyle?.sx 
                        }}
                    >
                        {title}
                    </Typography>
                ) : (
                    title
                )}
            </StyledSummary>
            <StyledDetails divider={divider}>
                {typeof children === 'string' ? (
                    <Typography 
                        variant="body2" 
                        {...textStyle}
                        sx={{ 
                            color: textColor ? getColor(theme, textColor) : 'text.secondary',
                            lineHeight: 1.6,
                            ...textStyle?.sx 
                        }}
                    >
                        {children}
                    </Typography>
                ) : (
                    children
                )}
            </StyledDetails>
        </StyledAccordion>
    );
};
