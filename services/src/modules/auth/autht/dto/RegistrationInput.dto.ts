import { IntersectionType, PickType } from '@nestjs/swagger';
import { User } from 'src/modules/users/entities/user.entity';
import { RawPasswordInput } from '../../dto/RawPasswordInput.dto';

// general registeration input
export type GeneralRegistrationInputType = {
  name: string;
  email: string;
  password: string;
  githubId?: string;
  wechatId?: string;
  phone?: string;
};

export class LocalAuthtRegistrationInput extends IntersectionType(
  PickType(User, ['name', 'email']),
  RawPasswordInput,
) {}

export class AfterGithubOAuthtRegistrationInput extends IntersectionType(
  LocalAuthtRegistrationInput,
  PickType(User, ['githubId']),
) {}
export class AfterWechatOAuthtRegistrationInput extends IntersectionType(
  LocalAuthtRegistrationInput,
  PickType(User, ['wechatId']),
) {}
export class AfterSmsAuthtRegistrationInput extends IntersectionType(
  LocalAuthtRegistrationInput,
  PickType(User, ['phone']),
) {}
