import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  constructor(private _config: ConfigService) {}

  private get _saltOrRounds(): string | number {
    return this._config.get<number>('auth.passwordHashSaltOrRounds');
  }

  public async compare(
    rawPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(rawPassword, hashedPassword);
  }

  public async encrypt(rawPassword: string): Promise<string> {
    return bcrypt.hash(rawPassword, this._saltOrRounds);
  }
}
