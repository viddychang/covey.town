import React, {useContext, useEffect, useState} from 'react';
import {Button, Input, IconButton, InputGroup, InputLeftElement , InputRightElement , Select} from "@chakra-ui/react";

import { CloseIcon } from '@chakra-ui/icons'
import logo from '../../logo.svg';
import './TownChat.css';
import { ChatContext } from './ChatContext';
import {ChatMessageProps} from "./ChatScreen";
import useCoveyAppState from "../../hooks/useCoveyAppState";
import useUserProfile from "../../hooks/useUserProfile";

const Chat = () =>  {
 // static contextType = ChatContext;

 const {
   players
} = useCoveyAppState();

  const [openChat, setOpenChat] = useState(false);
  const [inputMessage , setInputMessage] = useState("");
  let msgIndex = 0;
  const {
    userName
  } = useCoveyAppState();
  const today = new Date();
  const time = `${today.getHours()  }:${  today.getMinutes()}`;

  const [selectedValue, setselectedValue] = useState("all");

  const [messages, setMessages] = useState([{
    message: `Hello ${userName}! Type a message and press Send Message to continue the chat.` ,
    author: 'Covey Bot',
    to: 'all',
    time: '22:00'
  }]);

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
      setMessages( messages );
      console.log(messages);
    });
  },[ ])


  const handleMessage = (messageObj: ChatMessageProps): void => {
    if (inputMessage !== '') {
      myContext.send(messageObj);
      setInputMessage('' );
    }
    setMessages(oldArray => [...oldArray, messageObj]);
  };

    return (
      <div>
        Hello
        <Button onClick={() => setOpenChat(true)}>Public Chat</Button>
        {openChat &&
        <div className='Public-chat'>
          <div className="rcw-header">
            <IconButton 
              colorScheme="red"
              aria-label="Close Button"
              size="lg"
              onClick={() => setOpenChat(false)}
              icon={<CloseIcon />}
            />
            <h4 className="rcw-title">
              <img src="https://img.icons8.com/clouds/2x/real-estate.png" className="avatar" alt="profile" />
              Covey Town Title
            </h4>
            <span>Covey town chat subtitle</span>
          </div>
          <div className="App-chatbox">
            {messages.filter(m => m.to === userName || m.to === 'all' ||m.author === userName)
            .map((msg: ChatMessageProps) => {
              msgIndex += 1;
              return (
                <div className={msg.author === userName? "MyMessage" : "Message"} key={msgIndex}>
                  <p style={{float: "right"}}>
                    {msg.time}
                  </p>
                  <p>{msg.author}:</p>
                  {/* <p>{msg.to}, {userName}</p> */}
                  <p>
                    {msg.message}
                  </p>
                </div>
              );
            })}
          </div>
          <Select onChange={(event) => setselectedValue(event.target.value)} variant="outline">
            <option value="all">Everyone</option>
            {players.filter(p => p.userName !== userName).map(player => 
            <option key={player.id} value={player.userName}>{player.userName}</option>
            )}
            </Select>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
            >
              $
            </InputLeftElement>
            <Input
              className="App-Textarea"
              placeholder="Type your messsage here..."
              onChange={event => setInputMessage(event.target.value)}
            />
            <InputRightElement>
              <IconButton
                colorScheme="blue"
                aria-label="Search database"
                onClick={() => handleMessage({
                  message: inputMessage,
                  author: userName,
                  to: selectedValue,
                  time
                })}
              >Chat</IconButton>
            </InputRightElement>
          </InputGroup>
          <p>
            <button type="submit" onClick={() => {
              handleMessage({
                message: inputMessage,
                author: userName,
                to: selectedValue,
                time
              })
            }}>
              Send Message
            </button>
          </p>
        </div>}
      </div>
    );

}

export default Chat;

