import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import themes from '@chatapp/theme';
import App from './App';
import client from './client';
import './index.css';
import { ThemeWrapper } from './components/ThemeWrapper';

ReactDOM.render(
  <React.StrictMode>
    <ThemeWrapper theme={themes.light}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ThemeWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);
