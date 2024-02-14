import { Injectable } from '@nestjs/common';
import { JwtBaseGuard } from './jwt-base.guard';

@Injectable()
export class JwtSoftGuard extends JwtBaseGuard {
  protected noValidTokenHandler() {
    return {
      pass: true,
    };
  }
}
