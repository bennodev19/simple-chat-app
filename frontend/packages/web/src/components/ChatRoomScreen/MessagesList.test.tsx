import React from 'react';
import '@testing-library/jest-dom/extend-expect'; // https://github.com/testing-library/react-testing-library/issues/379
import { cleanup, render, getByTestId } from '@testing-library/react';
import MessagesList from './MessagesList';
import { ThemeWrapper } from '../ThemeWrapper';
import themes from '@chatapp/theme';

describe('MessagesList', () => {
  afterEach(cleanup);

  const time = new Date('1 Jan 2019 GMT');

  it('renders messages data', () => {
    const messages = [
      {
        id: '1',
        content: 'foo',
        createdAt: time,
      },
      {
        id: '2',
        content: 'bar',
        createdAt: time,
      },
    ];

    let message1, message2;
    {
      const { container, getAllByTestId, getByTestId } = render(
        <ThemeWrapper theme={themes.light}>
          <MessagesList messages={messages} />
        </ThemeWrapper>
      );
      const match = getAllByTestId('message-item');
      message1 = match[0];
      message2 = match[1];
    }

    expect(getByTestId(message1, 'message-content')).toHaveTextContent('foo');
    expect(getByTestId(message1, 'message-date')).toHaveTextContent('01:00');

    expect(getByTestId(message2, 'message-content')).toHaveTextContent('bar');
    expect(getByTestId(message2, 'message-date')).toHaveTextContent('01:00');
  });
});
