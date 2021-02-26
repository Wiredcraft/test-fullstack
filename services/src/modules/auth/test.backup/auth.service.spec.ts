import { Test, TestingModule } from '@nestjs/testing';
import { AuthtService } from '../autht/autht.service';
import { PasswordService } from '../autht/password.service';
// @ts-ignore
// eslint-disable-next-line
import { User, UserService } from '../user/user.service';

const VALID_USER: User = {
  username: 'Valid User',
  password: 'Valid User Password',
};
const INVALID_USER: User = {
  username: 'Invalid User',
  password: 'Invalid User Password',
};

const userService = {
  findOne(args: { where: { username: string } }): User | null {
    if (args.where.username === VALID_USER.username) {
      return VALID_USER;
    }
    return null;
  },
};

const passwordService = {
  compare(password: string, encrypted: string) {
    return true;
  },
};

describe('AuthService', () => {
  let service: AuthtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: userService,
        },
        {
          provide: PasswordService,
          useValue: passwordService,
        },
        AuthtService,
      ],
    }).compile();

    service = module.get<AuthtService>(AuthtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate a valid user', async () => {
    await expect(
      service.validateUser(VALID_USER.username, VALID_USER.password),
    ).resolves.toEqual({
      username: VALID_USER.username,
    });
  });

  it('should not validate a invalid user', async () => {
    await expect(
      service.validateUser(INVALID_USER.username, INVALID_USER.password),
    ).resolves.toBe(null);
  });
});
