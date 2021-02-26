import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { ClassType, transformAndValidate } from 'class-transformer-validator';
import { ExtendedRequest } from 'src/common/ext-request.interface';
import { UsersService } from 'src/modules/users/users.service';
import { AuthtAction } from './autht-action.enum';
import {
  AfterGithubOAuthtRegistrationInput,
  AfterSmsAuthtRegistrationInput,
  AfterWechatOAuthtRegistrationInput,
  GeneralRegistrationInputType,
  LocalAuthtRegistrationInput,
} from './dto/RegistrationInput.dto';

const classTypeDictByReqPath: Record<
  string,
  ClassType<GeneralRegistrationInputType>
> = {
  [`auth/${AuthtAction.AUTHT_LOCAL_REGISTRATION}`]: LocalAuthtRegistrationInput,
  [`auth/${AuthtAction.AUTHT_SMS_REGISTRATION}`]: AfterSmsAuthtRegistrationInput,
  [`auth/${AuthtAction.AUTHT_AFTER_OAUTH_GITHUB_REGISTRATION}`]: AfterGithubOAuthtRegistrationInput,
  [`auth/${AuthtAction.AUTHT_AFTER_OAUTH_WECHAT_REGISTRATION}`]: AfterWechatOAuthtRegistrationInput,
};

/**
 * Check if a new user is good to be created when:
 *
 * 1. payload validation passed
 * 2. some required fields has no conflicts
 * - name is unique
 * - email is unique
 *
 * @export
 * @class BeforeRegistrationGuard
 * @implements {CanActivate}
 */
@Injectable()
export class BeforeRegistrationGuard implements CanActivate {
  constructor(private readonly _usesService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: ExtendedRequest = context.switchToHttp().getRequest();

    const registrationInput: GeneralRegistrationInputType = req.body;
    // validate inputs
    const registrationInputClassType = this._getRegistrationInputClassType(
      req.path,
    );
    await this._validateInput(registrationInputClassType, registrationInput);

    // check unique fields
    await this._checkInstertabilityOrFail(registrationInput.name, 'username');
    await this._checkInstertabilityOrFail(registrationInput.email, 'email');

    // till now, it's 'safe' to insert the new user input
    return true;
  }

  private async _checkInstertabilityOrFail(
    nameOrEmail: string,
    what: 'username' | 'email',
  ) {
    const count = await this._usesService.getCountByNameOrEmail(nameOrEmail);
    if (count > 0) throw new BadRequestException(`The ${what} is in use`);
  }

  /**
   * Validate manually with `class-transformer-validator`
   *
   * TODO: need to check if:
   * with this interception of this guard, the `GeneralRegistrationInputType` does not go to controller, `class-validator` won't be called?
   *
   * @private
   * @param {ClassType<GeneralRegistrationInputType>} classType
   * @param {GeneralRegistrationInputType} input
   * @memberof BeforeRegistrationGuard
   */
  private async _validateInput(
    classType: ClassType<GeneralRegistrationInputType>,
    input: GeneralRegistrationInputType,
  ) {
    try {
      await transformAndValidate(classType, input);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  /**
   * Get the class type for payload validtation from the path
   * (which infers different registeration strategies)
   *
   * @private
   * @param {string} path
   * @returns {ClassType<GeneralRegistrationInputType>}
   * @memberof BeforeRegistrationGuard
   */
  private _getRegistrationInputClassType(
    path: string,
  ): ClassType<GeneralRegistrationInputType> {
    // (switch/if else)-less
    return classTypeDictByReqPath[path];
  }
}
