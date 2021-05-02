import React from 'react';
import '@testing-library/jest-dom/extend-expect'; // https://github.com/testing-library/react-testing-library/issues/379
import { createMemoryHistory, MemoryHistory } from 'history';
import { cleanup, render, waitFor, fireEvent } from '@testing-library/react';
import ChatNavbar from './ChatNavbar';
import { ThemeWrapper } from '../ThemeWrapper';
import themes from '@chatapp/theme';

describe('ChatNavbar', () => {
  let history: MemoryHistory;

  beforeEach(() => {
    history = createMemoryHistory();
  });

  // unmount and cleanup DOM after the test is finished
  afterEach(cleanup);

  it('renders chat data', () => {
    const time = new Date('1 Jan 2019 GMT');
    const chat = {
      id: '1',
      name: 'Foo Bar',
      picture: 'https://localhost:4000/picture.jpg',
      messages: [
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
      ],
    };

    {
      const { container, getByTestId } = render(
        <ThemeWrapper theme={themes.light}>
          <ChatNavbar chat={chat} history={history} />
        </ThemeWrapper>
      );

      expect(getByTestId('chat-name')).toHaveTextContent('Foo Bar');
      expect(getByTestId('chat-picture')).toHaveAttribute(
        'src',
        'https://localhost:4000/picture.jpg'
      );
    }
  });

  it('goes back on arrow click', async () => {
    const time = new Date('1 Jan 2019 GMT');
    const chat = {
      id: '1',
      name: 'Foo Bar',
      picture: 'https://localhost:4000/picture.jpg',
      messages: [
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
      ],
    };

    history.push('/chats/1');

    await waitFor(() => expect(history.location.pathname).toEqual('/chats/1'));

    {
      const { container, getByTestId } = render(
        <ThemeWrapper theme={themes.light}>
          <ChatNavbar chat={chat} history={history} />
        </ThemeWrapper>
      );

      fireEvent.click(getByTestId('back-button'));

      await waitFor(() => expect(history.location.pathname).toEqual('/chats'));
    }
  });
});
