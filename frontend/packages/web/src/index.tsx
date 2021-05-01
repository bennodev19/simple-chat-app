import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeContext, ThemeProvider } from 'styled-components';
import themes from '@chatapp/theme';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ThemeContext.Provider value={themes.light}>
      <ThemeProvider theme={themes.light}>
        <App />
      </ThemeProvider>
    </ThemeContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
