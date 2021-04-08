import {Widget} from "react-chat-widget";
import React from "react";
import {Button} from "@chakra-ui/react";


const PrivateChat = () => {
  const handleNewUserMessage = (newMessage: string) => {
    console.log(`New message incoming! ${newMessage}`);
  };

  const getCustomLauncher = (handleToggle: any) =>
    <Button onClick={handleToggle}>Private Chat</Button>

  return(<Widget
    title="Private Chat"
    subtitle="Private chat with: "
    fullScreenMode={false}
    handleNewUserMessage={handleNewUserMessage}
    launcher={(handleToggle: any) => getCustomLauncher(handleToggle)}
  />)
}

export default PrivateChat;
