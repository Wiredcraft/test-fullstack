import {
  Body,
  Controller,
  Delete,
  InternalServerErrorException,
  Post,
  Query,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SessionWithData } from 'src';
import { ExtendedRequest } from 'src/common/ext-request.interface';
import { UserProfileAccessToken } from 'src/modules/users/dto/UserProfile.dto';
import { UsersService } from 'src/modules/users/users.service';
import { AuthtAction } from './autht-action.enum';
import { AuthtService } from './autht.service';
import { BeforeRegistrationGuard } from './before-registration.guard';
import { LocalAuthtInput } from './dto/LocalAutht.dto';
import { LocalAuthtRegistrationInput } from './dto/RegistrationInput.dto';
import { LocalAutthGuard } from './local-autht.guard';
import { PasswordService } from './password.service';

@ApiTags('Authentication')
@Controller('session')
export class AuthtController {
  constructor(
    private readonly _service: AuthtService,
    private readonly _passwordService: PasswordService,
    private readonly _usersService: UsersService,
  ) {}

  @Post(AuthtAction.AUTHT_LOCAL)
  @UseGuards(LocalAutthGuard)
  @ApiOperation({ summary: 'Login via account identifier and password' })
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  @ApiBody({ type: LocalAuthtInput, required: true })
  async createSessionWithLocalStrategy(
    @Req() { user }: ExtendedRequest,
    @Query('redirect_uri') redirectURI: string,
    @Session() session: SessionWithData,
  ): Promise<null> {
    // can safely assume we have passed the `LocalAutthGuard`
    // and the user is safe
    return;
    // return this._service.resolveUserLoginResponse(user, session, redirectURI);
  }

  @Post(AuthtAction.AUTHT_LOCAL_REGISTRATION)
  @UseGuards(BeforeRegistrationGuard)
  @ApiOperation({ summary: 'Registration' })
  @ApiBadRequestResponse()
  @ApiBody({ type: LocalAuthtRegistrationInput, required: true })
  async createSessionFromRegistration(
    @Query('redirect_uri') redirectURI: string,
    @Body() { password: rawPassword, ...user }: LocalAuthtRegistrationInput,
    @Session() session: SessionWithData,
  ): Promise<UserProfileAccessToken> {
    // with `BeforeRegistrationGuard`, can guarantee a new user is 'instertable'
    const encrypedPassword = await this._passwordService.encrypt(rawPassword);
    const profile = await this._usersService.createOne({
      passwordHash: encrypedPassword,
      ...user,
    });
    return await this._service.resolveGeneralSessionCreation(profile, session);
  }

  @Delete()
  // @UseGuards(SessG)
  @ApiUnauthorizedResponse()
  async deleteSessionAndLogout(@Session() session: SessionWithData) {
    session.destroy(() => {
      throw new InternalServerErrorException('logout failure');
    });
  }
}
