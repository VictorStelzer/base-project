/**
 * Máscara para CPF: 000.000.000-00
 */
export const maskCPF = (value: string): string => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
};

/**
 * Máscara para CNPJ: 00.000.000/0000-00
 */
export const maskCNPJ = (value: string): string => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
};

/**
 * Máscara dinâmica para CPF ou CNPJ.
 */
export const maskCpfCnpj = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 11) {
        return maskCPF(digits);
    }
    return maskCNPJ(digits);
};

/**
 * Máscara para Telefone: (00) 0 0000-0000 ou (00) 0000-0000
 */
export const maskPhone = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 10) {
        return digits
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
    }
    return digits
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{1})(\d{4})(\d{4})/, '$1 $2-$3')
        .replace(/(-\d{4})\d+?$/, '$1');
};

/**
 * Máscara para Cartão de Crédito: 0000 0000 0000 0000
 */
export const maskCardNumber = (value: string): string => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\d{4})\d+?$/, '$1');
};

/**
 * Máscara para Data de Expiração: MM/AA
 */
export const maskExpiryDate = (value: string): string => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\/\d{2})\d+?$/, '$1');
};

/**
 * Máscara para CEP: 00000-000
 */
export const maskCEP = (value: string): string => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1');
};

