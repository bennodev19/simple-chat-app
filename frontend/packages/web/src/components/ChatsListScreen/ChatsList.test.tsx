import React from 'react';
import { cleanup, render, waitFor } from '@testing-library/react';
import ChatsList from './ChatsList';
import fetchMock from 'jest-fetch-mock';

describe('ChatsList', () => {
  beforeEach(() => {
    fetchMock.doMock();
  });

  // unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

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
      const { container, getByTestId } = render(<ChatsList />);

      // https://testing-library.com/docs/dom-testing-library/api-async/#waitfor
      await waitFor(() => container);

      expect(getByTestId('name')).toHaveTextContent('Foo Bar');
      expect(getByTestId('picture')).toHaveAttribute(
        'src',
        'https://localhost:4000/picture.jpg'
      );
      expect(getByTestId('content')).toHaveTextContent('Hello');
      expect(getByTestId('date')).toHaveTextContent('01:00');
    }
  });
});
