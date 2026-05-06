import React from 'react';

import { IMAGES, HEADER } from '@/constants';

import { useNavigate } from 'react-router-dom';

import { Container, Image, TextButton } from '@/components'
export const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container row alignItems between height="11vh" width="100%" position={'sticky'} top={0} zIndex={1100} bgcolor="background.default">
            <Image onClick={() => { navigate('/') }} src={IMAGES.site.logo} width={170} style={{ cursor: 'pointer' }} />

            {HEADER.Home.map((link, index) => (
                <TextButton color="text.secondary" fontWeight={600} fontSize={13} hover={{ color: 'primary.main' }} href={link.href} key={index}>
                    {link.label}
                </TextButton>
            ))}
        </Container>
    )
}
