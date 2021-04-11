import React, {useContext, useEffect, useState} from 'react';
import {Button, Input, IconButton, InputGroup, InputLeftElement , InputRightElement } from "@chakra-ui/react";
import logo from '../../logo.svg';
import './TownChat.css';
import { ChatContext } from './ChatContext';
import ChatScreen, {ChatMessageProps} from "./ChatScreen";
import useCoveyAppState from "../../hooks/useCoveyAppState";



const Chat = () =>  {
 // static contextType = ChatContext;

  const [openChat, setOpenChat] = useState(false);
  const [inputMessage , setInputMessage] = useState("");
  let msgIndex = 0;
  const {
    userName
  } = useCoveyAppState();
  const today = new Date();
  const time = `${today.getHours()  }:${  today.getMinutes()}`;



  const [messages, setMessages] = useState([{
    message: 'Welcome! Type a message and press Send Message to continue the chat.',
    author: 'Bot',
    time: '22:00'
  }]);

  const myContext = useContext(ChatContext);

  useEffect(() => {
    // this.context;
    // initiate socket connection
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
            <Button className="rcw-close-button" onClick={() => setOpenChat(false)}>
              Close
            </Button>
            <h4 className="rcw-title">
              <img src="https://img.icons8.com/clouds/2x/real-estate.png" className="avatar" alt="profile" />
              Covey Town Title
            </h4>
            <span>Covey town chat subtitle</span>
          </div>
          <div className="App-chatbox">
            {messages.map((msg: ChatMessageProps) => {
              msgIndex += 1;
              return (
                <div key={msgIndex}>
                  <p style={{float: "right"}}>
                    {msg.time}
                  </p>
                  <p>{msg.author}:</p>
                  <p>
                    {msg.message}
                  </p>

                </div>
              );
            })}
          </div>

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
