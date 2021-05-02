import React from 'react';
import {
  cleanup,
  render,
  waitFor,
  fireEvent,
  screen,
} from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom/extend-expect'; // https://github.com/testing-library/react-testing-library/issues/379

import { BrowserHistory, createBrowserHistory } from 'history';
import ChatsList from './ChatsList';

describe('ChatsList', () => {
  let history: BrowserHistory;

  beforeEach(() => {
    fetchMock.doMock();
    history = createBrowserHistory();

    history.push = jest.fn();
  });

  afterEach(() => {
    // unmount and cleanup DOM after the test is finished.
    cleanup();
  });

  it('renders fetched chats data', async () => {
    // Mock fetch API
    fetchMock.mockResponseOnce(
      JSON.stringify({
        data: {
          chats: [
            {
              id: 1,
              name: 'Foo Bar',
              picture: 'https://localhost:4000/picture.jpg',
              lastMessage: {
                id: 1,
                content: 'Hello',
                createdAt: new Date('1 Jan 2019 GMT'),
              },
            },
          ],
        },
      })
    );

    {
      // Render ChatList, and get specific jest methods like getByTestId() with which you can get DOM Elements by the defined data-testid
      // https://testing-library.com/docs/angular-testing-library/api/#render
      const { container, getByTestId } = render(
        <ChatsList history={history} />
      );

      // https://testing-library.com/docs/dom-testing-library/api-async/#waitfor
      await waitFor(() => screen.getByTestId('name'));

      expect(getByTestId('name')).toHaveTextContent('Foo Bar');
      expect(getByTestId('picture')).toHaveAttribute(
        'src',
        'https://localhost:4000/picture.jpg'
      );
      expect(getByTestId('content')).toHaveTextContent('Hello');
      expect(getByTestId('date')).toHaveTextContent('01:00');
    }
  });

  it('should navigate to the target chat room on chat item click', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        data: {
          chats: [
            {
              id: 1,
              name: 'Foo Bar',
              picture: 'https://localhost:4000/picture.jpg',
              lastMessage: {
                id: 1,
                content: 'Hello',
                createdAt: new Date('1 Jan 2019 GMT'),
              },
            },
          ],
        },
      })
    );

    {
      const { container, getByTestId } = render(
        <ChatsList history={history} />
      );

      await waitFor(() => screen.getByTestId('chat'));

      fireEvent.click(getByTestId('chat'));

      expect(history.push).toHaveBeenCalledWith('chats/1');
    }
  });
});
