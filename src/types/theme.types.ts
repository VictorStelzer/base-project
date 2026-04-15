import { ReactNode } from 'react';
import '@mui/material/styles';

export interface ThemeContextData {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
}

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
  }
}
