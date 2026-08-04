import { ReactNode } from 'react';

export interface ModalProps {
    /** Controla a visibilidade do modal. */
    open: boolean;
    /** Chamado ao fechar (clique fora do conteúdo, ESC ou botão de fechar). */
    onClose?: () => void;
    children?: ReactNode;
    /** Se true, exibe um ícone de fechar no canto superior direito. */
    close?: boolean;
    /** Se true, usa a cor de fundo "paper" do tema em vez do background padrão. */
    paper?: boolean;
    /** Título do modal. Uma string vira um título já estilizado; um ReactNode é usado como enviado. */
    title?: string | ReactNode;
    /** Largura do conteúdo do modal. Padrão: 400. */
    width?: string | number;
}
