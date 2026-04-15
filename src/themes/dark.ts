import type { ThemeOptions } from '@mui/material/styles';

export const darkThemeConfig: ThemeOptions = {
  palette: {
    mode: 'dark',
    common: {
      black: "#000",
      white: "#fff"
    },
    primary: {
      main: '#388DE9',
      light: '#63A8EF',
      dark: '#2763A3',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#4AD1B4',
      light: '#6EE0C7',
      dark: '#34927E',
      contrastText: '#ffffff'
    },
    tertiary: {
      main: '#D32281',
      light: '#E05A9C',
      dark: '#93185A',
      contrastText: '#ffffff'
    },
    error: {
      main: '#ff0000',
      light: '#FF4D4D',
      dark: '#B30000',
      contrastText: '#ffffff'
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
      contrastText: '#ffffff',
    },
    info: {
      main: '#06B6D4',
      light: '#22D3EE',
      dark: '#0891B2',
      contrastText: '#ffffff',
    },
    success: {
      main: '#2dc653',
      light: '#5AD878',
      dark: '#1F8A3A',
      contrastText: '#ffffff'
    },
    grey: {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#eeeeee",
      "300": "#e0e0e0",
      "400": "#bdbdbd",
      "500": "#9e9e9e",
      "600": "#757575",
      "700": "#616161",
      "800": "#424242",
      "900": "#212121",
      "A100": "#f5f5f5",
      "A200": "#eeeeee",
      "A400": "#bdbdbd",
      "A700": "#616161",
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
      disabled: '#666666',
    },
    divider: '#424242',
    background: {
      default: '#000',
      paper: '#1C1C2B',
    },
  },
};
