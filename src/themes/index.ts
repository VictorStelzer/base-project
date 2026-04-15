import '../types';
import { createTheme } from '@mui/material/styles';
import { lightThemeConfig } from './light';
import { darkThemeConfig } from './dark';
import { fontFamily } from './fonts';

export const lightTheme = createTheme({
  ...lightThemeConfig,
  typography: { fontFamily },
});
export const darkTheme = createTheme({
  ...darkThemeConfig,
  typography: { fontFamily },
});
