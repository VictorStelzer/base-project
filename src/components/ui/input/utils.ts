import type { MaskType } from './types';

import { maskCPF, maskCNPJ, maskCpfCnpj, maskPhone, maskCardNumber, maskExpiryDate, maskCEP } from '@/utils';

export const getMaskedValue = (value: string, mask: MaskType) => {
    switch(mask) {
        case 'cpf': return maskCPF(value);
        case 'cnpj': return maskCNPJ(value);
        case 'cpfCnpj': return maskCpfCnpj(value);
        case 'phone': return maskPhone(value);
        case 'cardNumber': return maskCardNumber(value);
        case 'expiryDate': return maskExpiryDate(value);
        case 'cep': return maskCEP(value);
        default: return value;
    }
};

export const getMaxLength = (mask: MaskType) => {
    switch(mask) {
        case 'cpf': return 14;
        case 'cnpj': return 18;
        case 'cpfCnpj': return 18;
        case 'phone': return 15;
        case 'cardNumber': return 19;
        case 'expiryDate': return 5;
        case 'cep': return 9;
        default: return undefined;
    }
};
