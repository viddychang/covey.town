import { fromEvent, Observable } from 'rxjs';
import { io } from 'socket.io-client';
import {ChatMessageProps} from "./types";

class SocketService {
  socket = io('localhost:8080', { transports: ['websocket', 'polling', 'flashsocket'] });

  public init(): SocketService {
    console.log('initiating socket service');
    // this.socket = io('localhost:8080');
    return this;
  }

  // send a message for the server to broadcast
  public send(message: ChatMessageProps): void {
    console.log(`emitting message: ${message}`);
    this.socket.emit('message', message);
  }

  // link message event to rxjs data source
  public onMessage(): Observable<ChatMessageProps> {
    return fromEvent(this.socket, 'message');
  }

  // disconnect - used when unmounting
  public disconnect(): void {
    this.socket.disconnect();
  }
}
export default SocketService;
