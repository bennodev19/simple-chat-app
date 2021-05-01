import { DateTimeResolver, URLResolver } from 'graphql-scalars';
import { chats, messages } from '../db';

// Each field in the resolvers object should match the GraphQL type it represents in the schema (typeDefs.graphql)
const resolvers = {
  Date: DateTimeResolver, // resolve the in the schema (typeDefs.graphql) defined scalars
  URL: URLResolver, // resolve the in the schema (typeDefs.graphql) defined scalars

  Chat: {
    lastMessage(chat: any) {
      console.log(chat);
      return messages.find((m) => m.id === chat.lastMessage);
    },
  },

  Query: {
    chats() {
      return chats;
    },
  },
};

export default resolvers;
