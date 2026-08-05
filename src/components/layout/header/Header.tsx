import React from 'react';

import { IMAGES, HEADER } from '@/constants';

import { useNavigate } from 'react-router-dom';

import { Container, Image, TextButton, ToggleTheme } from '@/components'
export const Header: React.FC = () => {
    const navigate = useNavigate();

    const goHome = () => navigate('/');

    return (
        <Container row alignItems between height="10vh" width="100%" position={'sticky'} top={0} zIndex={1100} bgcolor="background.default">
            <Image
                onClick={goHome}
                onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        goHome();
                    }
                }}
                role="button"
                tabIndex={0}
                src={IMAGES.site.logo}
                alt="Logo"
                width={170}
                style={{ cursor: 'pointer' }}
            />

            {HEADER.Home.map((link, index) => (
                <TextButton color="text.secondary" fontWeight={600} fontSize={13} hover={{ color: 'primary.main' }} href={link.href} key={index}>
                    {link.label}
                </TextButton>
            ))}
            <ToggleTheme />
        </Container>
    )
}
