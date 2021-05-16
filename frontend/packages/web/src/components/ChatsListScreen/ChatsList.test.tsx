import React from 'react';
import '@testing-library/jest-dom/extend-expect'; // https://github.com/testing-library/react-testing-library/issues/379
import { ApolloProvider } from '@apollo/react-hooks';
import {
  cleanup,
  render,
  waitFor,
  fireEvent,
  screen,
} from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { BrowserHistory, createBrowserHistory } from 'history';
import { ThemeWrapper } from '../ThemeWrapper';
import themes from '@chatapp/theme';
import { mockApolloClient } from '../../test-helpers';
import ChatsList, { getChatsQuery } from './ChatsList';

describe('ChatsList', () => {
  let history: BrowserHistory;

  beforeEach(() => {
    fetchMock.doMock();
    history = createBrowserHistory();
  });

  // unmount and cleanup DOM after the test is finished
  afterEach(cleanup);

  it('renders fetched chats data', async () => {
    // Create mock Apollo Client
    const client = mockApolloClient([
      {
        request: { query: getChatsQuery },
        result: {
          data: {
            chats: [
              {
                __typename: 'Chat',
                id: 1,
                name: 'Foo Bar',
                picture: 'https://localhost:4000/picture.jpg',
                lastMessage: {
                  __typename: 'Message',
                  id: 1,
                  content: 'Hello',
                  createdAt: new Date('1 Jan 2019 GMT'),
                },
              },
            ],
          },
        },
      },
    ]);

    {
      // Render ChatList, and get specific jest methods like getByTestId() with which you can get DOM Elements by the defined data-testid
      // https://testing-library.com/docs/angular-testing-library/api/#render
      const { container, getByTestId } = render(
        <ThemeWrapper theme={themes.light}>
          <ApolloProvider client={client}>
            <ChatsList history={history} />
          </ApolloProvider>
        </ThemeWrapper>
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
    const client = mockApolloClient([
      {
        request: { query: getChatsQuery },
        result: {
          data: {
            chats: [
              {
                __typename: 'Chat',
                id: 1,
                name: 'Foo Bar',
                picture: 'https://localhost:4000/picture.jpg',
                lastMessage: {
                  __typename: 'Message',
                  id: 1,
                  content: 'Hello',
                  createdAt: new Date('1 Jan 2019 GMT'),
                },
              },
            ],
          },
        },
      },
    ]);

    {
      const { container, getByTestId } = render(
        <ThemeWrapper theme={themes.light}>
          <ApolloProvider client={client}>
            <ChatsList history={history} />
          </ApolloProvider>
        </ThemeWrapper>
      );

      await waitFor(() => screen.getByTestId('chat'));

      fireEvent.click(getByTestId('chat'));

      await waitFor(() =>
        expect(history.location.pathname).toEqual('/chats/1')
      );
    }
  });
});
