import {Widget} from "react-chat-widget";
import React from "react";
import {Button} from "@chakra-ui/react";


const TownChat = () => {
  const handleNewUserMessage = (newMessage: string) => {
    console.log(`New message incoming! ${newMessage}`);
  };

  const getCustomLauncher = (handleToggle: any) =>
    <Button onClick={handleToggle}>Chat</Button>

  return(<Widget
    title={`Covey Town Name: `}
    subtitle="Welcome to this town. Lets start chatting!"
    fullScreenMode={false}
    handleNewUserMessage={handleNewUserMessage}
    launcher={(handleToggle: any) => getCustomLauncher(handleToggle)}
  />)
}

export default TownChat;
