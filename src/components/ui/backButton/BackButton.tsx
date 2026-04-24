import React from 'react';

import { Props } from './types';

import { Button } from '@/components';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useNavigate } from 'react-router-dom';

export const BackButton: React.FC<Props> = ({ variant = 'text', label = 'Voltar', onClick, ...props }) => {
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(event);
        } else {
            navigate(-1);
        }
    };

    return (
        <Button {...props} variant={variant} onClick={handleClick} startIcon={<ArrowBackIcon />}>
            {label}
        </Button>
    );
};
