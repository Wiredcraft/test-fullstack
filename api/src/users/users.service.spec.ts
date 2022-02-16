import { Test, TestingModule } from '@nestjs/testing';
import {
  getRepositoryToken,
} from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

import {  Repository } from 'typeorm';

const name = 'testuser1';
const githubId = 'ajiodsj2213jsd2';


const userArray = [
  new User({ githubId: '1234231', name: 'tesjies' }),
  new User({ githubId: 'dasad2d1d', name: 'asdad' }),
  new User({ githubId: 'asdd21ddswd', name: 'tesjdsaddsies' }),
];

const oneUser = new User({ githubId, name });

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(userArray),
            findOneOrFail: jest.fn().mockResolvedValue(oneUser),
            create: jest.fn().mockReturnValue(oneUser),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  // afterEach(async () => {
  //   await connection.close();
  // });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user successfully', async () => {
      
      expect(
        service.create({
          name,
          githubId,
        }),
      ).resolves.toEqual(oneUser);

      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith({
        name,
        githubId
      });
      expect(repo.save).toBeCalledTimes(1);
    });
  });
});
