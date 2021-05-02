import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeContext, ThemeProvider } from 'styled-components';

import themes from '@chatapp/theme';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ThemeContext.Provider value={themes.light}>
      <ThemeProvider theme={themes.light}>
        <App />
      </ThemeProvider>
    </ThemeContext.Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
