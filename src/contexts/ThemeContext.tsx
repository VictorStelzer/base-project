import { getTheme, getSavedThemeMode, saveThemeMode } from '@/themes';

import React, { createContext, useState, useMemo, useCallback } from 'react';

import type { ThemeContextData, ThemeProviderProps, LayoutType, ThemeMode } from '@/types';

import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';

export const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

export const AppThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(getSavedThemeMode);
  const [layoutType, setLayoutType] = useState<LayoutType>('unauth');

  const toggleTheme = useCallback(() => {
    setMode((prevMode: ThemeMode) => {
      const nextMode: ThemeMode = prevMode === 'light' ? 'dark' : 'light';
      saveThemeMode(nextMode);
      return nextMode;
    });
  }, []);

  const theme = useMemo(() => getTheme(mode, layoutType), [mode, layoutType]);

  const value = useMemo(
    () => ({ mode, toggleTheme, layoutType, setLayoutType }),
    [mode, toggleTheme, layoutType]
  );

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
