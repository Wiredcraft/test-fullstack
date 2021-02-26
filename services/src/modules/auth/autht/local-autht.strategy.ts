import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { transformAndValidate } from 'class-transformer-validator';
import { Request } from 'express';
import { Strategy } from 'passport-local';
import { UserProfileAuthtIntermediate } from 'src/modules/users/dto/UserProfile.dto';
import { UsersService } from 'src/modules/users/users.service';
import { LocalAuthtInput } from './dto/LocalAutht.dto';
import { PasswordService } from './password.service';

export const LOCAL_AUTHT_STRATEGY_TOKEN = 'local-autht-strategy';

@Injectable()
export class LocalAuthtStrategy extends PassportStrategy(
  Strategy,
  LOCAL_AUTHT_STRATEGY_TOKEN,
) {
  constructor(
    private readonly _moduleRef: ModuleRef,
    // UsersService is not a module scope provider, it's injected only
    private readonly _usersService: UsersService,
  ) {
    super({
      usernameField: 'identifier',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  public async validate(
    request: Request,
    identifier: string,
    password: string,
  ): Promise<{ id: string }> {
    await this._validateInput(identifier, password);

    const contextId = ContextIdFactory.getByRequest(request);

    const user = await this._checkIdentifier(identifier);

    // validate password
    const passwordService = await this._moduleRef.resolve(
      PasswordService,
      contextId,
    );
    await this._comparePassword(password, user.passwordHash, passwordService);

    // omit sensitive hash
    delete user.passwordHash;
    // this user should be appended to the request object
    return user;
  }

  private async _comparePassword(
    rawPassword: string,
    hashedPassword: string,
    service: PasswordService,
  ): Promise<void> {
    const result = await service.compare(rawPassword, hashedPassword);
    if (!result) throw new UnauthorizedException(`password invalid`);
  }

  private async _checkIdentifier(
    identifier: string,
  ): Promise<UserProfileAuthtIntermediate> {
    const user = await this._usersService.findIntermediateOneWithLocalAuthtInputs(
      identifier,
    );
    if (!user)
      throw new NotFoundException(
        `The user with a name or email ${identifier}, not found`,
      );
    return user;
  }

  /**
   * the `LocalAuthtInput` does not go to controller, `class-validator` won't be called,
   * should be validated manually with `class-transformer-validator`
   *
   * @param {string} identifier
   * @param {string} password
   * @memberof LocalAuthtStrategy
   */
  private async _validateInput(identifier: string, password: string) {
    try {
      await transformAndValidate(LocalAuthtInput, <LocalAuthtInput>{
        identifier,
        password,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
