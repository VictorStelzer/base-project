import React, { useId } from 'react';

import { ModalProps } from './types';

import { Modal as MuiModal, Fade } from '@mui/material';

import { Close } from '@mui/icons-material';

import { Box, Text, IconButton } from '@/components';

export const Modal: React.FC<ModalProps> = ({ open, onClose, children, close, paper, title, width }) => {
    const titleId = useId();

    return (
        <MuiModal open={open} onClose={onClose} closeAfterTransition>
            <Fade in={open}>
                {/* Wrapper de posicionamento: precisa ser um elemento simples pro Fade clonar o ref nele. */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        outline: 'none',
                    }}
                >
                    <Box
                        column
                        gap={2}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={typeof title === 'string' ? titleId : undefined}
                        {...(paper ? { paper: true } : { bgcolor: 'background.default' })}
                        radius={12}
                        p={3}
                        width={width ?? 400}
                        sx={{
                            maxWidth: '90vw',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            boxShadow: 24,
                        }}
                    >
                        {(title || close) && (
                            <Box row full between alignItems="center" gap={2}>
                                {title ? (
                                    typeof title === 'string' ? (
                                        <Text id={titleId} variant="h6" fontWeight="bold">{title}</Text>
                                    ) : title
                                ) : <Box />}

                                {close && (
                                    <IconButton color='text.primary' onClick={onClose} size={18} aria-label="Fechar">
                                        <Close />
                                    </IconButton>
                                )}
                            </Box>
                        )}

                        {children}
                    </Box>
                </Box>
            </Fade>
        </MuiModal>
    );
};
