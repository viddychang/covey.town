import { useEffect, useRef, useState } from "react";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const SOCKET_SERVER_URL = "http://localhost:4000";

const useChat = (roomId: string) => {
  const [messages, setMessages] = useState([]);

  return { messages };
};

export default useChat;
