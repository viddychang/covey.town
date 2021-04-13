import { ArrowForwardIcon, ChatIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Spacer,
} from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import React, { useContext, useEffect, useState } from 'react';
import useCoveyAppState from '../../hooks/useCoveyAppState';
import { ChatContext } from './ChatContext';
import './TownChat.css';
import {ChatMessageProps} from "./types";


const Chat = () => {
  // static contextType = ChatContext;

  const { players, currentTownFriendlyName } = useCoveyAppState();

  const [openChat, setOpenChat] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  let msgIndex = 0;
  const { userName } = useCoveyAppState();
  const today = new Date();
  const time = `${today.getHours()}:${today.getMinutes()}`;

  const [selectedValue, setselectedValue] = useState('all');

  const [messages, setMessages] = useState([
    {
      id: '1',
      message: `Hello ${userName}! Type a message and press Send Message to continue the chat.`,
      author: 'Covey Bot',
      to: 'all',
      time: '22:00',
    },
  ]);

  const myContext = useContext(ChatContext);

  useEffect(() => {
    // this.context;
    // initiate socket connection

    // if(openChatScreen){
    //   setOpenChat(true);
    // }
    myContext.init();

    const observable = myContext.onMessage();

    observable.subscribe((m: ChatMessageProps) => {
      messages.push(m);
      setMessages(messages);
      console.log(messages);
    });
  }, []);

  const handleMessage = (messageObj: ChatMessageProps): void => {
    if (inputMessage !== '') {
      myContext.send(messageObj);
      setInputMessage('');
    }
    setMessages(oldArray => [...oldArray, messageObj]);
  };

  return (
    <div>
      <Flex align='right' justify='right'>
        <Spacer />
        <IconButton
          size='lg'
          colorScheme='twitter'
          aria-label='Chat Button'
          className='footer'
          icon={<ChatIcon />}
          onClick={() => setOpenChat(true)}
        />
      </Flex>
      {openChat && (
        <Flex className='Public-chat'>
          <Flex className='rcw-header'>
            <Box p='5'>
              <h4 className='rcw-title'>
                <img
                  src='https://img.icons8.com/clouds/2x/real-estate.png'
                  className='avatar'
                  alt='profile'
                />
                {currentTownFriendlyName} Chat Room
              </h4>
            </Box>
            <Spacer />
            <Box p='4'>
              <IconButton
                colorScheme='red'
                aria-label='Close Button'
                size='lg'
                onClick={() => setOpenChat(false)}
                icon={<CloseIcon />}
              />
            </Box>
          </Flex>
          <div className='App-chatbox'>
            {messages
              .filter(m => m.to === userName || m.to === 'all' || m.author === userName)
              .map((msg: ChatMessageProps) => {
                msgIndex += 1;
                return (
                  <Box bg='blue.400' key={msg.id} overflow='auto' m='5'>
                    <div
                      className={msg.author === userName ? 'MyMessage' : 'Message'}
                      key={msgIndex}>
                      <p style={{ float: 'right' }}>{msg.time}</p>
                      <p>
                        {msg.author} {msg.to === userName ? '(privately)' : ''}:
                      </p>
                      {/* <p>{msg.to}, {userName}</p> */}
                      <p>{msg.message}</p>
                    </div>
                  </Box>
                );
              })}
          </div>
          <Select onChange={event => setselectedValue(event.target.value)} variant='outline'>
            <option value='all'>Everyone</option>
            {players
              .filter(p => p.userName !== userName)
              .map(player => (
                <option key={player.id} value={player.userName}>
                  {player.userName}
                </option>
              ))}
          </Select>
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
              <IconButton
                colorScheme='twitter'
                aria-label='Search database'
                icon={<ArrowForwardIcon />}
                onClick={() =>
                  handleMessage({
                    id: nanoid(),
                    message: inputMessage,
                    author: userName,
                    to: selectedValue,
                    time,
                  })
                }
              />
            </InputRightElement>
          </InputGroup>
          <p>
            <button
              type='submit'
              onClick={() => {
                handleMessage({
                  id: nanoid(),
                  message: inputMessage,
                  author: userName,
                  to: selectedValue,
                  time,
                });
              }}>
              Send Message
            </button>
          </p>
        </Flex>
      )}
    </div>
  );
};

export default Chat;
