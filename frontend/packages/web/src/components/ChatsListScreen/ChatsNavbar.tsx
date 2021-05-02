import React from 'react';
import styled from 'styled-components';
import { Toolbar } from '@material-ui/core';

const ChatsNavbar: React.FC = () => {
  return <Container>Whatsapp Clone</Container>;
};

export default ChatsNavbar;

const Container = styled(Toolbar)`
  background-color: ${(props) => props.theme.colors.primaryBg};
  color: ${(props) => props.theme.colors.primaryText};
  font-size: 20px;
  line-height: 40px;
`;
