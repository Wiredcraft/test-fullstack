import { ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const name = 'testuser1';
const githubId = 'ajiodsj2213jsd2';

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
