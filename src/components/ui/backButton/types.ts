import { ButtonProps } from '@/components';

/**
 * Propriedades do componente BackButton, estendendo as customizações do nosso Button.
 */
export interface BackButtonProps extends ButtonProps {
    /** Texto exibido no botão. Padrão: "Voltar". */
    label?: string;
}
