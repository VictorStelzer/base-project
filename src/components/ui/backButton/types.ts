import { Props as ButtonProps } from '../button/types';

/**
 * Propriedades do componente BackButton, estendendo as customizações do nosso Button.
 */
export interface Props extends ButtonProps {
    /** Texto exibido no botão. Padrão: "Voltar". */
    label?: string;
}
