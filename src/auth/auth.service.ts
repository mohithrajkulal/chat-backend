import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async validateUser(email: string, password: string) {
        const user = await prisma.user.findUnique({ where: { email }});
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) throw new UnauthorizedException('Invalid credentials');

        return user;
    }

    async login(user: any) {
        const payload = { sub: user.id, email: user.email};
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}