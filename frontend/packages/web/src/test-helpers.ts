import { ApolloClient, InMemoryCache } from '@apollo/client';
import { MockLink } from 'apollo-link-mock';

export const mockApolloClient = (mocks: any) => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new MockLink(mocks) as any,
  });
};
