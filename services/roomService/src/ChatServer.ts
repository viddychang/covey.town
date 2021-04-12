import express from 'express';
import { createServer, Server } from 'http';
import socketio from 'socket.io';

import cors = require('cors');

export enum ChatEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  MESSAGE = 'message',
}

export interface ChatMessage {
  author: string;
  message: string;
}

export class ChatServer {
  public static readonly PORT: number = 8080;

  private _app: express.Application;

  private server: Server;

  private io: socketio.Server;
  
  private port: string | number;

  constructor() {
    this._app = express();
    this.port = process.env.PORT || ChatServer.PORT;
    this._app.use(cors());
    this._app.options('*', cors());
    this.server = createServer(this._app);
    this.io = new socketio.Server(this.server);
    this.listen();
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      // console.log('Running server on port %s', this.port);
    });

    this.io.on(ChatEvent.CONNECT, (socket: any) => {
      // console.log('Connected client on port %s.', this.port);

      socket.on(ChatEvent.MESSAGE, (m: ChatMessage) => {
        // console.log('[server](message): %s', JSON.stringify(m));
        this.io.emit('message', m);
      });

      socket.on(ChatEvent.DISCONNECT, () => {
        // console.log('Client disconnected');
      });
    });
  }

  get app(): express.Application {
    return this._app;
  }
}
