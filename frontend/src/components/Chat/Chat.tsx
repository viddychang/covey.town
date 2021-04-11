import React from 'react';
import logo from '../../logo.svg';
import './TownChat.css';
import { ChatMessage, ChatState } from './types';
import { ChatContext } from './ChatContext';


class Chat extends React.Component <any, any> {
 // static contextType = ChatContext;
 constructor(props: any) {
  super(props);
    this. state = {
      messages: [
        {
          message: 'Welcome! Type a message and press Send Message to continue the chat.',
          author: 'Bot'
        }
      ],
      input: ''
    }
  }
  
  componentDidMount () {
  
    const myContext = this.context;
    // initiate socket connection
    myContext.init();

    const observable = myContext.onMessage();

    observable.subscribe((m: ChatMessage) => {
      const {messages} = this.state;
      messages.push(m);
      this.setState({ messages });
    });
  }

  componentWillUnmount () {
    const myContext = this.context;
    myContext.disconnect();
  }

  render () {

    const updateInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
      this.setState({ input: e.target.value });
    }

    const handleMessage = (): void => {
      const myContext = this.context;
      const author = 'Ross';
      const {inp} = this.state;
      if (inp !== '') {
        myContext.send({
          message: inp,
          author
        });
        this.setState({ input: '' });
      }
    };

    let msgIndex = 0;
    const {messages,input} = this.state
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />

        <div className="App-chatbox">
          {messages.map((msg: ChatMessage) => {
            msgIndex += 1;
            return (
              <div key={msgIndex}>
                <p>{msg.author}</p>
                <p>
                  {msg.message}
                </p>
              </div>
            );
          })}
        </div>
        <input
          className="App-Textarea"
          placeholder="Type your messsage here..."
          onChange={updateInput}
          value={input}
        />
        <p>
          <button type='button' onClick={() => { handleMessage() }}>
            Send Message
          </button>
        </p>
      </div>
    );
  }
}

export default Chat;
Chat.contextType = ChatContext