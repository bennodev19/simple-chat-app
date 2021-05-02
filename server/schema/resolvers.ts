import { DateTimeResolver, URLResolver } from 'graphql-scalars';
import { chats, messages } from '../db';

// Each field in the resolvers object should match the GraphQL type it represents in the schema (typeDefs.graphql)
const resolvers = {
  Date: DateTimeResolver, // resolve the in the schema (typeDefs.graphql) defined scalar
  URL: URLResolver, // resolve the in the schema (typeDefs.graphql) defined scalar

  Chat: {
    // 1. prop: The previous object (https://graphql.org/learn/execution/#root-fields-resolvers)
    // So here the chat of chats
    messages(chat: any) {
      return messages.filter((m) => chat.messages.includes(m.id));
    },

    lastMessage(chat: any) {
      const lastMessage = chat.messages[chat.messages.length - 1];

      return messages.find((m) => m.id === lastMessage);
    },
  },

  // Entry point of the GraphQL query
  Query: {
    chats() {
      return chats;
    },

    // 1. prop: The previous object, which for a field on the root Query type is often not used
    // 2. prop: The arguments provided to the field in the GraphQL query (https://graphql.org/learn/execution/#root-fields-resolvers)
    chat(root: any, { chatId }: any) {
      return chats.find((c) => c.id === chatId);
    },
  },
};

export default resolvers;
