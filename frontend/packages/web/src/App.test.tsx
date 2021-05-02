import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import themes from '@chatapp/theme';
import { ThemeWrapper } from './components/ThemeWrapper';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ThemeWrapper theme={themes.light}>
      <App />
    </ThemeWrapper>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
