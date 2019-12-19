import { JwtStrategy } from '../jwt.strategy';
import { Test } from '@nestjs/testing';
import { UserRepository } from '../user.repository';
import { User } from '../user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

const mockUserRepository = () => ({
  findOne: jest.fn(),
});

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: 'topSecret51',
          signOptions: { expiresIn: 3600 },
        }),
      ],
      providers: [JwtStrategy, { provide: UserRepository, useFactory: mockUserRepository }],
    }).compile();

    jwtStrategy = await module.get<JwtStrategy>(JwtStrategy);
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('validate', () => {
    it('validates and returns the user based on JWT payload', async () => {
      const user = new User();
      user.username = 'TestUser';

      userRepository.findOne.mockResolvedValue(user);
      const result = await jwtStrategy.validate({ username: 'TestUser' });
      expect(userRepository.findOne).toHaveBeenCalledWith({ username: 'TestUser' });
      expect(result).toEqual(user);
    });

    it('throws an unauthorized exception as user cannot be found', async () => {
      userRepository.findOne.mockResolvedValue(null);
      await expect(jwtStrategy.validate({ username: 'TestUser' })).rejects.toThrow(UnauthorizedException);
    });
  });
});
