import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

const httpMocks = require('node-mocks-http'); // eslint-disable-line

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [
        JwtModule.register({
          secret: 'testingsecret123',
          signOptions: {
            expiresIn: '2 days',
          },
        }),
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('logout', () => {
    it('logs out user successfully', async () => {
      const req = httpMocks.createRequest({
        method: 'DELETE',
        url: '/auth',
        cookies: {
          fs_jwt: 'hi',
        },
      });

      const res = httpMocks.createResponse();

      const spy = jest.spyOn(res, 'clearCookie');

      await controller.logout(req, res);

      expect(spy).toHaveBeenCalledWith('fs_jwt', {
        expires: new Date(1),
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        path: '/',
      });
    });
  });
});
