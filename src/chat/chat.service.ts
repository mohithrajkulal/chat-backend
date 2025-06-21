import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ChatService {
    async saveMessage(data) {
        return prisma.message.create({
            data: {
                content: data.content,
                userId: data.userId,
                roomId: data.roomId
            },
            include: {
                user: true,
                room: true,
            },
        })
    }
}
