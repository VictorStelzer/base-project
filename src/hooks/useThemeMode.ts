import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import type { ThemeContextData } from '@/types';

export const useThemeMode = (): ThemeContextData => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeMode must be used within an AppThemeProvider');
  }

  return context;
};
