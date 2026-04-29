import { useContext } from 'react';

import type { ThemeContextData } from '@/types';

import { ThemeContext } from '@/contexts/ThemeContext';

export const useThemeMode = (): ThemeContextData => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeMode must be used within an AppThemeProvider');
  }

  return context;
};
