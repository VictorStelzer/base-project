import React, { createContext, useState, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from '../themes';
import type { ThemeContextData, ThemeProviderProps } from '@/types';

export const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

export const AppThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [layoutType, setLayoutType] = useState<'auth' | 'unauth'>('unauth');

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => getTheme(mode, layoutType), [mode, layoutType]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, layoutType, setLayoutType }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
