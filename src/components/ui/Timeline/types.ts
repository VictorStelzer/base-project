import React from 'react';
import { TimelineProps as MuiTimelineProps } from '@mui/lab';
import { SpacingProps, SizeProps, VisibilityProps, PositionStyleProps } from '@/components/styles';

export interface TimelineItemProps {
    /**
     * Título do item da Timeline.
     * Pode ser uma string (usa estilo de texto destacado padrão) ou um componente/ReactNode customizado.
     */
    title?: React.ReactNode;

    /**
     * Conteúdo do item da Timeline (ex: instituição, período, descrição).
     */
    children?: React.ReactNode;

    /**
     * Conteúdo do lado oposto da Timeline (ex: data, período ou categoria).
     */
    oppositeContent?: React.ReactNode;

    /**
     * Cor do marcador/bullet (ex: 'primary.main', 'secondary.main', 'text.primary', '#ff0000').
     */
    bulletColor?: string;

    /**
     * Ícone exibido no interior do marcador/bullet.
     */
    bulletIcon?: React.ReactNode;

    /**
     * Alias para `bulletIcon`.
     */
    icon?: React.ReactNode;

    /**
     * Variante visual do marcador/bullet ('filled' | 'outlined').
     * @default 'filled'
     */
    bulletVariant?: 'filled' | 'outlined';

    /**
     * Cor da linha conectora (ex: 'secondary.main', 'divider', 'primary.light').
     */
    lineColor?: string;

    /**
     * Cor global para o marcador e a linha conectora (não altera a cor do texto do título).
     */
    color?: string;

    /**
     * Tamanho customizado que controla as dimensões do marcador (bullet) e a espessura da linha.
     */
    size?: number | string;

    /**
     * Oculta a linha conectora abaixo deste marcador.
     */
    hideConnector?: boolean;

    /**
     * Alias para `hideConnector`.
     */
    isLast?: boolean;

    className?: string;
    style?: React.CSSProperties;
}

export interface TimelineProps extends TimelineItemProps, SpacingProps, SizeProps, VisibilityProps, Omit<PositionStyleProps, 'position'> {
    /**
     * Lista de itens da Timeline. Renderiza todos os itens em um único container contínuo.
     */
    items?: TimelineItemProps[];

    /**
     * Posicionamento dos itens da timeline ('left' | 'right' | 'alternate' | 'alternate-reverse').
     * @default 'right'
     */
    position?: MuiTimelineProps['position'];

    className?: string;
    style?: React.CSSProperties;
    sx?: MuiTimelineProps['sx'];
}
