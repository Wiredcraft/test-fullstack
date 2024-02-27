import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtSecret } from './auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomRequest } from 'src/interfaces/customRequest';

@Injectable()
export class JwtBaseGuard implements CanActivate {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: CustomRequest = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      const result = this.noValidTokenHandler();
      if (!result.pass) {
        throw new UnauthorizedException(result.errorMessage);
      }
      return true;
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtSecret,
      });
      const userId = payload?.userId;
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (user) {
        request.user = user;
      }
    } catch {
      const result = this.noValidTokenHandler();
      if (!result.pass) {
        throw new UnauthorizedException(result.errorMessage);
      }
    }
    return true;
  }

  protected noValidTokenHandler():
    | {
        pass: boolean;
        errorMessage?: string;
      }
    | never {
    throw new Error('must implement noValidTokenHandler');
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
