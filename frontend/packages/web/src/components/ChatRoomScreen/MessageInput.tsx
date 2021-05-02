import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

interface MessageInputProps {
  onSendMessage(content: string): any;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const onKeyPress = (e: any) => {
    if (e.charCode === 13) {
      submitMessage();
    }
  };

  const onChange = ({ target }: any) => {
    setMessage(target.value);
  };

  const submitMessage = () => {
    if (!message) return;

    setMessage('');

    if (typeof onSendMessage === 'function') {
      onSendMessage(message);
    }
  };
  return (
    <Container>
      <ActualInput
        type="text"
        placeholder="Type a message"
        value={message}
        onKeyPress={onKeyPress}
        onChange={onChange}
        data-testid="message-input"
      />
      <SendButton
        variant="contained"
        color="primary"
        onClick={submitMessage}
        data-testid="send-button">
        <SendIcon />
      </SendButton>
    </Container>
  );
};

export default MessageInput;

const Container = styled.div`
  display: flex;
  height: 50px;
  padding: 20px;
  justify-content: center;
`;

const ActualInput = styled.input`
  width: 100%;
  border: none;
  border-radius: 8px;
  padding: 10px 20px 10px 20px;
  font-size: 15px;
  outline: none;
  box-shadow: 0 1px silver;
  line-height: 45px;
`;

const SendButton = styled(Button)`
  min-width: 50px !important;
  width: 50px !important;
  border-radius: 100% !important;
  background-color: ${(props) => props.theme.colors.primaryBg} !important;
  margin: 0 5px !important;
  color: white !important;
  padding-left: 20px !important;

  svg {
    margin-left: -3px;
  }
`;
