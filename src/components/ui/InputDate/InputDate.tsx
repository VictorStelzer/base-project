import React from 'react';

import { InputDateProps } from './types';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useTheme } from '@mui/material';

import { Box, Text } from '@/components';

import { getRadiusStyles, getColor } from '@/components/styles';

export const InputDate: React.FC<InputDateProps> = (allProps) => {
    const {
        inputLabel,
        errorText,
        bgcolor,
        paper,
        iconColor,
        radius = 12,
        circle,
        square,
        width,
        height = 45,
        required,
        optional,
        fullWidth,
        p, pr, pl, pt, pb, px, py,
        m, ml, mr, mt, mb, mx, my,
        hideDown,
        hideUp,
        format = 'DD/MM',
        ...props
    } = allProps;

    const theme = useTheme();
    const hasError = !!errorText;

    // Mesma lógica do Input: só reserva o espaço do helper text se `errorText` foi
    // explicitamente declarado (mesmo undefined) — senão o campo fica mais "alto" que
    // os vizinhos numa mesma linha que não usam errorText.
    const isErrorTextDeclared = 'errorText' in allProps;
    const finalHelperText = hasError ? errorText : (isErrorTextDeclared ? ' ' : undefined);

    const bgColor = paper ? theme.palette.background.paper :
        bgcolor === true ? theme.palette.background.default :
            bgcolor ? getColor(theme, bgcolor) : undefined;

    const resolvedIconColor = iconColor ? getColor(theme, iconColor) : theme.palette.primary.main;

    const popupPaperSx = {
        backgroundColor: theme.palette.background.default,
        backgroundImage: 'none',
        border: '1px solid rgba(232,223,200,.18)',
    };

    return (
        <Box
            width={width || (fullWidth ? '100%' : 'auto')}
            p={p} pr={pr} pl={pl} pt={pt} pb={pb} px={px} py={py}
            m={m} ml={ml} mr={mr} mt={mt} mb={mb} mx={mx} my={my}
            column
        >
            {inputLabel && (
                <Text variant="body2" fontWeight='bold' ml={0.5} mb={0.8}>
                    {inputLabel} {required && <span style={{ color: 'red' }}>*</span>} {optional && <span style={{ color: 'grey' }}> (Opcional) </span>}
                </Text>
            )}

            <DatePicker
                {...props}
                format={format}
                slotProps={{
                    textField: {
                        fullWidth: true,
                        error: hasError,
                        helperText: finalHelperText,
                        sx: {
                            // O DatePicker (MUI X v7+) usa por padrão o `PickersOutlinedInput`,
                            // que tem sua própria classe (não é o `MuiOutlinedInput` do TextField clássico).
                            '& .MuiInputBase-root, & .MuiPickersOutlinedInput-root': {
                                height,
                                ...(bgColor && { backgroundColor: bgColor }),
                                ...getRadiusStyles(theme, { radius, circle, square }),
                            },
                            '& .MuiOutlinedInput-notchedOutline, & .MuiPickersOutlinedInput-notchedOutline': {
                                ...getRadiusStyles(theme, { radius, circle, square }),
                            },
                            '& .MuiIconButton-root': {
                                color: resolvedIconColor,
                            },
                            '& .MuiFormHelperText-root': {
                                minHeight: '20px',
                                margin: theme.spacing(0.5, 0.5, 0, 0.5),
                                lineHeight: '1.2',
                            },
                        },
                    },
                    desktopPaper: { sx: popupPaperSx },
                    mobilePaper: { sx: popupPaperSx },
                }}
            />
        </Box>
    );
};
