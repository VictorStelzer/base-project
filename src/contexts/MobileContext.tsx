import { useMediaQuery, useTheme } from '@mui/material';

import React, { createContext, useMemo } from 'react';

import type { MobileContextData } from '@/types';

export const MobileContext = createContext<MobileContextData | undefined>(undefined);

export const MobileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const value = useMemo(() => ({ isMobile, isTablet }), [isMobile, isTablet]);

  return (
    <MobileContext.Provider value={value}>
      {children}
    </MobileContext.Provider>
  );
};
