import React, { forwardRef, useState } from 'react';

import { InputProps } from './types';

import { TextField, InputAdornment, IconButton as MuiIconButton } from '@mui/material';

import { styled } from '@mui/material/styles';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { Box, Text } from '@/components';
import { getRadiusStyles, getColor, RADIUS_PROPS } from '@/components/styles';

import { getMaskedValue, getMaxLength } from './utils';

const StyledTextField = styled(TextField, {
    shouldForwardProp: (prop) => ![...RADIUS_PROPS, 'bgcolor', 'paper', 'customHeight'].includes(prop as string)
})<any>(({ theme, ...props }) => {
    const bgColor = props.paper ? theme.palette.background.paper :
        props.bgcolor === true ? theme.palette.background.default :
            props.bgcolor ? getColor(theme, props.bgcolor) : undefined;

    return {
        ...(props.customHeight && {
            '& .MuiInputBase-root': {
                height: props.customHeight
            }
        }),
        '& .MuiOutlinedInput-root, & .MuiFilledInput-root, & .MuiInput-root': {
            ...(bgColor && { backgroundColor: bgColor }),
            ...getRadiusStyles(theme, props),
        },
        '& .MuiFormHelperText-root': {
            minHeight: '20px',
            margin: theme.spacing(0.5, 0.5, 0, 0.5),
            lineHeight: '1.2',
        }
    };
});

export const Input = forwardRef<HTMLDivElement, InputProps>(function Input(allProps, ref) {
    const {
        inputLabel,
        errorText,
        icon,
        iconRight,
        password,
        mask,
        bgcolor,
        paper,
        radius = 12,
        circle,
        square,
        width,
        height = 45,
        p, pr, pl, pt, pb, px, py,
        m, ml, mr, mt, mb, mx, my,
        onChange,
        type,
        required,
        optional,
        error,
        helperText,
        ...props
    } = allProps;

    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => setShowPassword(!showPassword);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (mask) {
            e.target.value = getMaskedValue(e.target.value, mask);
        }
        if (onChange) {
            onChange(e);
        }
    };

    let startAdornment = props.InputProps?.startAdornment;
    if (icon) {
        startAdornment = (
            <InputAdornment position="start" sx={{ color: `${props.color || 'primary'}.main` }}>
                {icon}
            </InputAdornment>
        );
    }

    let endAdornment = props.InputProps?.endAdornment;
    if (password) {
        endAdornment = (
            <InputAdornment position="end">
                <MuiIconButton onClick={handleTogglePassword} edge="end" color={props.color || 'primary'}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                </MuiIconButton>
            </InputAdornment>
        );
    } else if (iconRight) {
        endAdornment = (
            <InputAdornment position="end" sx={{ color: `${props.color || 'primary'}.main` }}>
                {iconRight}
            </InputAdornment>
        );
    }

    // Verifica se a prop errorText foi passada no componente, mesmo que seu valor seja undefined
    const isErrorTextDeclared = 'errorText' in allProps;

    // Controla a visibilidade do error logicamente para manter o layout intáctil
    const hasError = error !== undefined ? error : !!errorText;
    const finalHelperText = hasError ? (errorText || helperText) : (helperText || (isErrorTextDeclared ? ' ' : undefined));

    return (
        <Box
            width={width || (props.fullWidth ? '100%' : 'auto')}
            p={p} pr={pr} pl={pl} pt={pt} pb={pb} px={px} py={py}
            m={m} ml={ml} mr={mr} mt={mt} mb={mb} mx={mx} my={my}
            column
        >
            {inputLabel && (
                <Text variant="body2" fontWeight='bold' ml={0.5} mb={0.8}>
                    {inputLabel} {required && <span style={{ color: 'red' }}>*</span>} {optional && <span style={{ color: 'grey' }}> (Opcional) </span>}
                </Text>
            )}

            <StyledTextField
                {...props}
                ref={ref}
                required={required}
                type={password && !showPassword ? 'password' : (password && showPassword ? 'text' : type)}
                error={hasError}
                helperText={finalHelperText}
                onChange={handleChange}
                bgcolor={bgcolor}
                paper={paper}
                radius={radius}
                circle={circle}
                square={square}
                customHeight={height}
                fullWidth={true}
                InputProps={{
                    ...props.InputProps,
                    startAdornment,
                    endAdornment,
                }}
                inputProps={{
                    ...props.inputProps,
                    maxLength: mask ? getMaxLength(mask) : props.inputProps?.maxLength
                }}
            />
        </Box>
    );
});

Input.displayName = 'Input';
