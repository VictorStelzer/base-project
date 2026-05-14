import React from 'react';

import { BackButtonProps } from './types';

import { Button } from '@/components';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useNavigate } from 'react-router-dom';

export const BackButton: React.FC<BackButtonProps> = ({ variant = 'text', label = 'Voltar', onClick, ...props }) => {
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(event);
        } else {
            navigate(-1);
        }
    };

    return (
        <Button width='fit-content' fontWeight='bold' fontSize={20} {...props} variant={variant} onClick={handleClick} startIcon={<ArrowBackIcon />}>
            {label}
        </Button>
    );
};
