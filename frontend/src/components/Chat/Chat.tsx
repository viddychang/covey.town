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
import 'emoji-mart/css/emoji-mart.css';
import _ from 'underscore';
import {nanoid} from 'nanoid';
import React, {useContext, useEffect, useState} from 'react';
import useCoveyAppState from '../../hooks/useCoveyAppState';
import './TownChat.css';
import EmojiInput from './EmojiInput';
import {ChatMessageProps} from "./types";
import useMaybeVideo from "../../hooks/useMaybeVideo";

const messagesRESTURL = "https://covey-town-mongo.herokuapp.com"

export type ChatMessage = {
  id: string,
  message: string,
  author: string,
  to: string,
  time: string
}

export type MessageFromDB = {
  _id: string,
  from: string,
  to: string,
  message: string,
  roomId: string,
  timestamp: string
}

const Chat = () => {
  // Constants used
  const {players, currentTownFriendlyName, currentTownID, userName, socket, messages} = useCoveyAppState();
  let msgIndex = 0;
  const today = new Date();
  const time = `${today.getHours()}:${today.getMinutes()}`;
  const video = useMaybeVideo();

  // React hooks
  const [openChat, setOpenChat] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedValue, setselectedValue] = useState('all');
  // const [messages, setMessages] = useState([
  //   {
  //     id: '1',
  //     message: `Hello ${userName}! Type a message and press Send Message to continue the chat.`,
  //     author: 'Covey Bot',
  //     to: 'all',
  //     time: '22:00',
  //   },
  // ]);

  const openedChat = (state: boolean) => {
    setOpenChat(state);
    video?.pauseGame();
  };

  const closedChat = (state: boolean) => {
    setOpenChat(state);
    video?.unPauseGame();
  };


  // Function to convert the messages stored in DB to the format of chat displayed in the chat box
  const convertMessagesToChat = (messagesFromDB: MessageFromDB[]) => {
    const messagesArr = [] as ChatMessage[];
    messagesFromDB.forEach((chat) => {
      const timeStamp = new Date(chat.timestamp);
      const chatMessage = {
        id: '',
        message: '',
        author: '',
        to: '',
        time: ''
      }
      if (chat.to === 'all') {
        chatMessage.id = chat._id;
        chatMessage.message = chat.message;
        chatMessage.author = chat.from;
        chatMessage.to = 'all';
        chatMessage.time = `${timeStamp.getHours()}:${timeStamp.getMinutes()}`;
        messagesArr.push(chatMessage)
      }
    });
    return (messagesArr);
  }

  // This useEffect runs on page load and populates the chat box with previous messages
  useEffect(() => {
    // Fetching all the stored messages for the current town
    const messagesResponse = `${messagesRESTURL}/fetchAllMessages/${currentTownID}`;
    fetch(messagesResponse)
      .then((res) => res.json())
      .then((messagesFromDB) => {
        const messageHistory = convertMessagesToChat(messagesFromDB)
        // setMessages(oldArray => [...oldArray, ...messageHistory]);
        messageHistory.map(messageObj =>
          socket?.emit('message', messageObj.id, messageObj.message, messageObj.author, messageObj.to, messageObj.time))
      });
  }, [])

  const handleMessage = (messageObj: ChatMessageProps): void => {
    if (inputMessage !== '') {
      socket?.emit('message', messageObj.id, messageObj.message, messageObj.author, messageObj.to, messageObj.time);
      setInputMessage('');

      // Insert the message into DB
      fetch(`${messagesRESTURL}/message`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: userName,
          to: selectedValue,
          message: inputMessage,
          roomId: currentTownID,
        })
      }).then((res) => console.log("Message posted successfully:", res.json()));
    }
    // setMessages(oldArray => [...oldArray, messageObj]);
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

  const emojiInserted = (messageWithEmoji: string) => {
    setInputMessage(`${messageWithEmoji}`);
  };


  return (
    <div>
      <Flex align='right' justify='right'>
        <Spacer/>
        <IconButton
          size='lg'
          position='fixed'
          colorScheme='twitter'
          aria-label='Chat Button'
          className='footer'
          icon={<ChatIcon/>}
          onClick={() => openedChat(true)}
        />
      </Flex>
      {openChat && <Flex className='Public-chat'>
          <div className="rcw-header">
              <Grid templateColumns="repeat(4, 1fr)" gap={2}>
                  <GridItem colSpan={3}>
                      <h4 className="rcw-title">
                          <Avatar
                              src='https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Chat-2-512.png'
                              className="avatar" alt="profile"/>
                        {currentTownFriendlyName} Chat Room
                      </h4>
                  </GridItem>
                  <GridItem colSpan={1}>
                      <Button className="rcw-close-button" onClick={() => closedChat(false)}>
                          <CloseIcon/>
                      </Button>
                  </GridItem>
              </Grid>
          </div>
          <div className='App-chatbox'>
            {
              _.uniq(messages.messages, 'id')
                .filter((m) => m.to === userName || m.to === 'all' || m.author === userName)
                .map((msg: ChatMessageProps) => {
                  msgIndex += 1;
                  return (
                    <Box key={msg.id} overflow='auto' m='5'
                         className={msg.author === userName ? 'MyMessage' : 'Message'}
                         color={(msg.to === userName) || (msg.author === userName && msg.to !== 'all')
                           ? 'black' : 'white'}>
                      <div
                        ref={el => {
                          if (el != null) {
                            return (el.scrollIntoView())
                          }
                          return null;
                        }}
                        key={msgIndex}>
                        <p style={{float: 'right'}}>{msg.time}</p>
                        <p>
                          {msg.author === userName ? 'You' : msg.author} {msg.to === userName ? '(privately)' : ''} {(msg.author === userName && msg.to !== 'all') ? `(To ${msg.to} privately )` : ''} :
                        </p>
                        <p>{msg.message}</p>
                      </div>
                    </Box>
                  );
                })}
          </div>
          <InputGroup>
              <Select
                  className='select-chat'
                  onChange={event => setselectedValue(event.target.value)}
                  variant='outline'>
                  <option value="" selected disabled hidden>Recipient</option>
                  <option className='select-chat' value='all'>Everyone</option>
                {players
                  .filter(p => p.userName !== userName)
                  .map(player => (
                    <option className='select-chat' key={player.id} value={player.userName}>
                      {player.userName}
                    </option>
                  ))}
              </Select>
              <Input
                  type='text'
                  className='App-Textarea'
                  placeholder='Type your message...'
                  onKeyPress={onKeyPress}
                  onChange={event => setInputMessage(event.target.value)}
                  value={inputMessage}
              />
              <EmojiInput value={inputMessage} onSelection={emojiInserted}/>
              <IconButton
                  colorScheme='twitter'
                  aria-label='Search database'
                  icon={<ArrowForwardIcon/>}
                  isDisabled={inputMessage === ''}
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
          </InputGroup>
      </Flex>}
    </div>
  );
};

export default Chat;
