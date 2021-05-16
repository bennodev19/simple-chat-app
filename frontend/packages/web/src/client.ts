// https://www.tortilla.academy/Urigo/WhatsApp-Clone-Tutorial/master/next/step/7
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from '@apollo/react-hooks';

const httpUri = process.env.REACT_APP_SERVER_URL + '/graphql';

const httpLink = new HttpLink({
  uri: httpUri,
});

const inMemoryCache = new InMemoryCache();

export default new ApolloClient({
  cache: inMemoryCache,
  link: httpLink,
});
