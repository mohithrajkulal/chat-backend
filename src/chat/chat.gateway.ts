import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(client: Socket) {
    console.log(`client Connected: ${client.id}`)
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() data: {roomId: number },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`room-${data.roomId}`)
    client.emit('joinedRoom', data.roomId)
  }
  
  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: { userId: number; roomId: number; content: string},
    @ConnectedSocket() client: Socket
  ) {
    const message = await this.chatService.saveMessage(data);
    this.server.to(`room-${data.roomId}`).emit('message', message)
  }
}
