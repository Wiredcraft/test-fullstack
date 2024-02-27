import { Injectable } from '@nestjs/common';
import { JwtBaseGuard } from './jwt-base.guard';

@Injectable()
export class JwtAuthGuard extends JwtBaseGuard {
  protected noValidTokenHandler() {
    return {
      pass: false,
      errorMessage: 'need to login',
    };
  }
}
