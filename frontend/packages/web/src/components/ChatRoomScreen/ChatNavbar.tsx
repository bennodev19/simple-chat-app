import React, { useCallback } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { History } from 'history';
import { ChatQueryResult } from './index';

interface ChatNavbarProps {
  history: History;
  chat: ChatQueryResult;
}

const ChatNavbar: React.FC<ChatNavbarProps> = ({ chat, history }) => {
  const goBack = useCallback(() => {
    history.replace('/chats');
  }, [history]);

  return (
    <Container>
      <BackButton onClick={goBack}>
        <ArrowBackIcon />
      </BackButton>
      <Picture src={chat.picture} />
      <Name>{chat.name}</Name>
    </Container>
  );
};

export default ChatNavbar;

const Container = styled(Toolbar)`
  padding: 0;
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.primaryBg};
  color: ${(props) => props.theme.colors.primaryText};
`;

const BackButton = styled(Button)`
  svg {
    color: ${(props) => props.theme.colors.primaryText};
  }
`;

const Picture = styled.img`
  height: 40px;
  width: 40px;
  margin-top: 3px;
  margin-left: -22px;
  object-fit: cover;
  padding: 5px;
  border-radius: 50%;
`;

const Name = styled.div`
  line-height: 56px;
`;
