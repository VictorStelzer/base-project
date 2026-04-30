import '../types';
import { createTheme, Theme } from '@mui/material/styles';
import { lightThemeConfig } from './light';
import { darkThemeConfig } from './dark';
import { fontInter, fontRoboto } from './fonts';

export const getTheme = (mode: 'light' | 'dark', layoutType: 'auth' | 'unauth'): Theme => {
  const isLight = mode === 'light';
  const baseConfig = isLight ? lightThemeConfig : darkThemeConfig;
  const currentFontFamily = layoutType === 'auth' ? fontRoboto : fontInter;

  return createTheme({
    ...baseConfig,
    typography: { fontFamily: currentFontFamily },
    shape: {
      borderRadius: 10,
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1280,
      },
    }
  })
};
