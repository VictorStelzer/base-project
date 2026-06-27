import { ReactNode } from 'react';
import '@mui/material/styles';

export type ThemeMode = 'light' | 'dark';
export type LayoutType = 'auth' | 'unauth';

export interface ThemeContextData {
  mode: ThemeMode;
  toggleTheme: () => void;
  layoutType: LayoutType;
  setLayoutType: (layout: LayoutType) => void;
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
