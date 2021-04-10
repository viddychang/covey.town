import React, {useState} from 'react';
import {Button} from "@chakra-ui/react";
import ChatScreen from "./ChatScreen";

const Chat = () => {

  const [openChat, setOpenChat] = useState(false);
  const messages = [{
    message: "Hi Dwight! How are you?",
    author: "Jim",
    time: "22:00"
  },
    {
      message: "Jim! Stop troubling me...",
      author: "Dwight",
      time: "22:01"
    },
    {
      message: "Quit fighting you two!",
      author: "Michael",
      time: "22:02"
    }]



  return (
    <div>
      <Button onClick={() => setOpenChat(true)}>Public Chat</Button>
      {console.log({openChat})}
      {openChat &&
      <ChatScreen messages={messages} closeChat={() => setOpenChat(false)} handleMessage={(m) => console.log(m)}/>}
    </div>)

}

export default Chat;
