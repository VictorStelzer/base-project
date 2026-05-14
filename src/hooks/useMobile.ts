import { useContext } from 'react';

import { MobileContext } from '@/contexts/MobileContext';

import type { MobileContextData } from '@/types';

export const useMobile = (): MobileContextData => {
  const context = useContext(MobileContext);

  if (!context) {
    throw new Error('useMobile must be used within a MobileProvider');
  }

  return context;
};
