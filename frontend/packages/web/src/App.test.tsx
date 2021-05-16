import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import themes from '@chatapp/theme';
import { ThemeWrapper } from './components/ThemeWrapper';
import { ApolloProvider } from '@apollo/react-hooks';
import { mockApolloClient } from './test-helpers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const client = mockApolloClient([]);

  ReactDOM.render(
    <ThemeWrapper theme={themes.light}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
      ,
    </ThemeWrapper>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
