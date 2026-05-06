import React from 'react';

import { IMAGES, FOOTER } from '@/constants';

import { Box, Container, Text, Divider, Image, TextButton } from '@/components'

export const Footer: React.FC = () => {
    return (
        <Container column py={2} width="100%" bgcolor="#1C1C2B" color="grey.500">
            <Box py={6} row="md" gap={8}>
                <Box column gap={3} width={{ xs: '100%', md: "20%" }}>
                    <Image sx={{ filter: 'brightness(0) invert(1)' }} src={IMAGES.site.logo} width={100} />
                </Box>

                <Box row="md" gap={{ xs: 4, md: 24 }}>
                    {FOOTER.home.map((section, index) => (
                        <Box key={index} column gap={2.5}>
                            <Text fontWeight={700} fontSize={14} color="common.white" letterSpacing="1px">
                                {section.label}
                            </Text>

                            <Box column gap={1.5}>
                                {section.links.map((link, linkIndex) => (
                                    <TextButton variant='body2' color="grey.400" hover={{ color: 'secondary.main' }} href={link.href} key={linkIndex}>
                                        {link.label}
                                    </TextButton>
                                ))}
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Divider color="grey.700" />

            <Text textAlign="center" fontSize={12} color="grey.600" py={4}>
                © Todos os direitos reservados.
            </Text>
        </Container>
    )
}