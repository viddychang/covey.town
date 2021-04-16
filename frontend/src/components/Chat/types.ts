export interface ChatMessage {
  author: string;
  message: string;
}

export interface ChatState {
  input: string;
  messages: ChatMessage[];
}

export type ChatMessageProps = {
  id: string;
  message: string;
  author: string;
  to: string;
  time: string;
  townid: string;
};
