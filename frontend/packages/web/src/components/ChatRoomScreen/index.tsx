import gql from 'graphql-tag';
import React, { useCallback } from 'react';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import ChatNavbar from './ChatNavbar';
import MessageInput from './MessageInput';
import MessagesList from './MessagesList';
import { History } from 'history';

// gql is from 'graphql-tag' that parses the GraphQL string to an AST,
// something which is required when using Apollo Client
const getChatQuery = gql`
  query GetChat($chatId: ID!) {
    chat(chatId: $chatId) {
      id
      name
      picture
      messages {
        id
        content
        createdAt
      }
    }
  }
`;

interface ChatRoomScreenParams {
  chatId: string;
  history: History;
}

export interface ChatQueryMessage {
  id: string;
  content: string;
  createdAt: Date;
}

export interface ChatQueryResult {
  id: string;
  name: string;
  picture: string;
  messages: Array<ChatQueryMessage>;
}

type OptionalChatQueryResult = ChatQueryResult | null;

const ChatRoomScreen: React.FC<ChatRoomScreenParams> = (props) => {
  const { chatId, history } = props;

  // Get Apollo Client from Context Api (wrapped in index.tsx)
  const client = useApolloClient();

  // Fetch Chats from Apollo Client
  const { data } = useQuery<any>(getChatQuery, {
    variables: { chatId },
  });
  const chat: OptionalChatQueryResult = data?.chat ?? null;

  const onSendMessage = useCallback(
    (content: string) => {
      if (!chat) return null;

      const message = {
        id: (chat.messages.length + 10).toString(),
        createdAt: new Date(),
        content,
        __typename: 'Chat', // That's how Apollo Client knows where to place the cached results. (https://www.apollographql.com/docs/react/caching/cache-configuration/#default-identifier-generation)
      };

      // Write Chat Query with the apollo 'wrapper'
      client.writeQuery({
        query: getChatQuery,
        variables: { chatId },
        data: {
          chat: {
            ...chat,
            messages: chat.messages.concat(message),
          },
        },
      });
    },
    [chat, chatId, client]
  );

  if (!chat) return null;

  return (
    <Container>
      <ChatNavbar chat={chat} history={history} />
      {chat.messages && <MessagesList messages={chat.messages} />}
      <MessageInput onSendMessage={onSendMessage} />
    </Container>
  );
};

export default ChatRoomScreen;

const Container = styled.div`
  background: url(/assets/chat-background.jpg);
  display: flex;
  flex-flow: column;
  height: 100%;
`;
