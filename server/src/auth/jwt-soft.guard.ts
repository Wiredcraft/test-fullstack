import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtSecret } from './auth.module';
import { UserStorage } from 'src/users/user.store';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtSoftGuard implements CanActivate {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('trigger soft guard');
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      console.log('no token');
      return true;
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtSecret,
      });
      const userId = payload?.userId;
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      console.log(`user found: `, user);
      if (user) {
        UserStorage.set(user);
      }
    } catch {
      console.log('token not valid or user not found');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
