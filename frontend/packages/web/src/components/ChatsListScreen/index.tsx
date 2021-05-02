import React from 'react';
import styled from 'styled-components';
import { History } from 'history';
import ChatsList from './ChatsList';
import ChatsNavbar from './ChatsNavbar';

interface ChatsListScreenProps {
  history: History;
}

const ChatsListScreen: React.FC<ChatsListScreenProps> = (props) => {
  const { history } = props;

  return (
    <Container>
      <ChatsNavbar />
      <ChatsList history={history} />
    </Container>
  );
};

export default ChatsListScreen;

const Container = styled.div`
  height: 100vh;
`;
