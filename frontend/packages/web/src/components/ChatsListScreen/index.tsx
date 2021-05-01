import React from 'react';
import ChatsList from './ChatsList';
import ChatsNavbar from './ChatsNavbar';
import styled from 'styled-components';

const ChatsListScreen: React.FC = () => {
  return (
    <Container>
      <ChatsNavbar />
      <ChatsList />
    </Container>
  );
};

export default ChatsListScreen;

const Container = styled.div`
  height: 100vh;
`;
