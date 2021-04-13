import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import useCoveyAppState from '../../hooks/useCoveyAppState';
import './TownChat.css';

type TownChatProps = {
  messages: ChatMessageProps[];
  closeChat: () => void;
  handleMessage: (input: { author: string; time: string; message: string }) => void;
};

export type ChatMessageProps = {
  id: string;
  message: string;
  author: string;
  to: string;
  time: string;
};

const ChatScreen = ({ messages, closeChat, handleMessage }: TownChatProps) => {
  const [inputMessage, setInputMessage] = useState('');
  let msgIndex = 0;
  const { userName } = useCoveyAppState();

  const today = new Date();
  const time = `${today.getHours()}:${today.getMinutes()}`;

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      handleMessage({
        message: inputMessage,
        author: userName,
        time,
      });
    }
  };

  return (
    <div className='Public-chat'>
      <div className='rcw-header'>
        <Button className='rcw-close-button' onClick={closeChat}>
          Close
        </Button>
        <h4 className='rcw-title'>
          <img
            src='https://img.icons8.com/clouds/2x/real-estate.png'
            className='avatar'
            alt='profile'
          />
          Covey Town Title
        </h4>
        <span>Covey town chat subtitle</span>
      </div>
      <div className='App-chatbox'>
        {messages.map((msg: ChatMessageProps) => {
          msgIndex += 1;
          return (
            <div key={msgIndex}>
              <p style={{ float: 'right' }}>{msg.time}</p>
              <p>{msg.author}:</p>
              <p>{msg.message}</p>
            </div>
          );
        })}
      </div>

      <InputGroup>
        <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em'>
          $
        </InputLeftElement>
        <Input
          className='App-Textarea'
          placeholder='Type your messsage here...'
          onChange={event => setInputMessage(event.target.value)}
        />
        <InputRightElement>
          <IconButton colorScheme='blue' aria-label='Search database'>
            Chat
          </IconButton>
        </InputRightElement>
      </InputGroup>
      <p>
        <button
          type='submit'
          onClick={() => {
            handleMessage({
              message: inputMessage,
              author: userName,
              time,
            });
          }}>
          Send Message
        </button>
      </p>
    </div>
  );
};

export default ChatScreen;
