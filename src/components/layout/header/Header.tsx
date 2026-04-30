import React from 'react';

import { IMAGES, HEADER } from '@/constants';
import { Container, Image, Button, Box, TextButton } from '@/components'

export const Header: React.FC = () => {
    return (
        <Container row alignItems between height="11vh" width="100%" position={'sticky'}>
            <Image onClick={() => { window.location.href = '/' }} src={IMAGES.site.logo} width={170} />
            <Box row gap={4} alignItems>
                <Box gap={4}>
                    {HEADER.Home.map((link) => (
                        <TextButton color="text.secondary" fontWeight={600} fontSize={14} hover={{ color: 'primary.main' }} href={link.href} key={link.label}>{link.label}</TextButton>
                    ))}
                </Box>

                <Button circle>Entrar</Button>
            </Box>
        </Container>
    )
}
