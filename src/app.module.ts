import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatController } from './chat/chat.controller';
import { ChatService } from './chat/chat.service';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController, ChatController],
  providers: [AppService, ChatService, ChatGateway],
})
export class AppModule {}
