import { useMediaQuery, useTheme } from '@mui/material';

import React, { createContext, useContext, useMemo } from 'react';

interface MobileContextData {
  isMobile: boolean;
  isTablet: boolean;
}

const MobileContext = createContext<MobileContextData>({} as MobileContextData);

export const MobileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  
  // Usamos os breakpoints oficiais do seu tema MUI
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // useMemo para evitar que o contexto mude a cada renderização da App
  const value = useMemo(() => ({ isMobile, isTablet }), [isMobile, isTablet]);

  return (
    <MobileContext.Provider value={value}>
      {children}
    </MobileContext.Provider>
  );
};

export const useMobile = () => useContext(MobileContext);
