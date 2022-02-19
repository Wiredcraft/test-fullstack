import { ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Vote } from '../talks/entities/vote.entity';
import { Talk } from '../talks/entities/talk.entity';

const name = 'testuser1';
const githubId = 'ajiodsj2213jsd2';

const userArray = [
  new User({
    githubId: '1234231',
    name: 'tesjies',
    voteTalkIds: ['abc'],
  }),
  new User({ githubId: 'dasad2d1d', name: 'asdad' }),
  new User({ githubId: 'asdd21ddswd', name: 'tesjdsaddsies' }),
];

const oneUser = new User({
  id: 'testuuuid',
  githubId,
  name,
  voteTalkIds: ['abc'],
});

describe('UsersController', () => {
  let controller: UsersController;
  const canActivate = (context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    req.user = { id: oneUser.id, name: oneUser.name };
    return true;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findOneWithTaskVotes: jest.fn().mockReturnValue(oneUser),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate })
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET - /users/me', () => {
    it('should return successfully', async () => {
      const req = { user: { id: oneUser.id } };
      const res = await controller.getUserMe(req);
      expect(res).toEqual({
        id: oneUser.id,
        name,
        githubId,
        voteTalkIds: ['abc'],
      });
    });
  });
});
