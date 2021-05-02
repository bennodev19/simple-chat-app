import React from 'react';
import ReactDOM from 'react-dom';
import themes from '@chatapp/theme';
import App from './App';
import './index.css';
import { ThemeWrapper } from './components/ThemeWrapper';

ReactDOM.render(
  <React.StrictMode>
    <ThemeWrapper theme={themes.light}>
      <App />
    </ThemeWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);
