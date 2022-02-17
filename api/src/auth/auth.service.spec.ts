import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

const githubId = 'aoisjdjdjd';
const name = 'dajoidiowajdia';

const oneUser = new User({ githubId, name });
const otherUser = new User({ githubId: 'abc12344444', name: 'uaidaudsai' });

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneOrFail: jest.fn().mockResolvedValue(oneUser),
            create: jest.fn().mockReturnValue(oneUser),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOrCreateGithubUser', () => {
    it('should find a user successfully', async () => {
      const userSpy1 = jest
        .spyOn(usersService, 'findOneByGithubId')
        .mockResolvedValueOnce(oneUser);
      
      jest.spyOn(usersService, 'create');

      expect(
        service.getOrCreateGithubUser({
          name,
          githubId,
        }),
      ).resolves.toEqual(oneUser);

      expect(userSpy1).toBeCalledWith(githubId);
    });

    it('should create a user if necessary', async () => {
      const userSpy1 = jest
        .spyOn(usersService, 'findOneByGithubId')
        .mockRejectedValueOnce(new Error('nada.'));
      const userSpy2 = jest
        .spyOn(usersService, 'create')
        .mockResolvedValueOnce(otherUser);

      expect(
        service.getOrCreateGithubUser({
          name,
          githubId,
        }),
      ).resolves.toEqual(otherUser);

      expect(userSpy1).toBeCalledWith(githubId);
    });
  });
});
