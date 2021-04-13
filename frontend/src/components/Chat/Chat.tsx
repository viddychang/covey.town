
import {ArrowForwardIcon, ChatIcon, CloseIcon} from '@chakra-ui/icons';
import {
  Box, Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spacer,
  Grid,
  GridItem, Avatar,
  Select
} from '@chakra-ui/react';
import {nanoid} from 'nanoid';
import React, {useContext, useEffect, useState} from 'react';
import useCoveyAppState from '../../hooks/useCoveyAppState';
import {ChatContext} from './ChatContext';
import './TownChat.css';
import {ChatMessageProps} from "./types";


const Chat = () => {
  // static contextType = ChatContext;

  const {players, currentTownFriendlyName} = useCoveyAppState();

  const [openChat, setOpenChat] = useState(false);
  const [inputMessage, setInputMessage] = useState('all');
  let msgIndex = 0;
  const {userName} = useCoveyAppState();
  const today = new Date();
  const time = `${today.getHours()}:${today.getMinutes()}`;

  const [selectedValue, setselectedValue] = useState('');

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
      setInputMessage('');
    });
  }, []);

  const handleMessage = (messageObj: ChatMessageProps): void => {
    if (inputMessage !== '') {
      myContext.send(messageObj);
      setInputMessage('');
    }
    setMessages(oldArray => [...oldArray, messageObj]);
  };

  const handleChange = (event:any) => {
    console.log({event})
    setselectedValue(event.target.value);
  };

  const onKeyPress = (event: any) => {
    if (event.charCode === 13) {
      handleMessage({
        id: nanoid(),
        message: inputMessage,
        author: userName,
        to: selectedValue,
        time,
      })
    }
  }

  return (
    <div>
      <Flex align='right' justify='right'>
        <Spacer/>
        <IconButton
          size='lg'
          colorScheme='twitter'
          aria-label='Chat Button'
          className='footer'
          icon={<ChatIcon/>}
          onClick={() => setOpenChat(true)}
        />
      </Flex>
      {openChat && <Flex className='Public-chat'>
          <div className="rcw-header">
            <Grid templateColumns="repeat(4, 1fr)" gap={2}>
              <GridItem colSpan={3}>
                <h4 className="rcw-title">
                  <Avatar
                    src='https://cdn2.iconfinder.com/data/icons/donate-2/64/community-house-city-shop-business-town-512.png'
                    className="avatar" alt="profile"/>
                  {currentTownFriendlyName} Chat Room
                </h4>
              </GridItem>
              <GridItem colSpan={1}>
                <Button className="rcw-close-button" onClick={() => setOpenChat(false)}>
                  <CloseIcon/>
                </Button>
              </GridItem>
            </Grid>
          </div>
          <div className='App-chatbox'>
            {messages
              .map((msg: ChatMessageProps) => {
                msgIndex += 1;
                return (
                  <Box bg='blue.400' key={msg.id} overflow='auto' m='5'>
                    <div
                      className={msg.author === userName ? 'MyMessage' : 'Message'}
                      key={msgIndex}>
                      <p style={{float: 'right'}}>{msg.time}</p>
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
        <Select
        className='select-chat'
          onChange={event => setselectedValue(event.target.value)} variant='outline'>
          <option className='select-chat' value='all'>Everyone</option>
          {players
            .filter(p => p.userName !== userName)
            .map(player => (
              <option className='select-chat' key={player.id} value={player.userName}>
                {player.userName}
              </option>
            ))}
        </Select>
          <InputGroup>
            <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em'>
              <ChatIcon/>
            </InputLeftElement>
            <Input
              className='App-Textarea'
              placeholder='Type your messsage here...'
              onChange={event => setInputMessage(event.target.value)}
              onKeyPress={onKeyPress}

            />
            <InputRightElement>
              <IconButton
                colorScheme='twitter'
                aria-label='Search database'
                icon={<ArrowForwardIcon/>}
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
        </Flex>}
    </div>
  );
};

export default Chat;
