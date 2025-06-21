import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
   async create(data: CreateUserDto) {
    const { password, ...rest } = data;
    const hashedPassword = await bcrypt.hash(password, 10)
    return prisma.user.create({
        data: {
            ...rest,
            password: hashedPassword,
        }
    });
   }

   async findAll() {
    return prisma.user.findMany();
   }

   async findOne(id: string) {
    return prisma.user.findUnique({ where: { id }})
   }

   async remove(id: string) {
    return prisma.user.delete({ where: { id }})
   }
}