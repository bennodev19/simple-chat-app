import { ThemeInterface } from '@chatapp/theme';
import React from 'react';
import { ThemeContext, ThemeProvider } from 'styled-components';

export interface ThemeWrapperProps {
  theme: ThemeInterface;
}

export const ThemeWrapper: React.FC<ThemeWrapperProps> = (props) => {
  const { children, theme } = props;
  return (
    <ThemeContext.Provider value={theme}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
