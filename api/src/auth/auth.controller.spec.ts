import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

const httpMocks = require('node-mocks-http');

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
        eventEmitter: require('events').EventEmitter,
        method: 'DELETE',
        url: '/auth',
        cookies: {
          fs_jwt: {
            value: 'abc123123',
            options: { httpOnly: true },
          },
        },
      });

      const res = httpMocks.createResponse();

      const controllerRes = await controller.logout(req, res);

      expect(controllerRes.header('cookie')).toEqual(undefined);
      expect(controllerRes.statusCode).toEqual(204);
      
    });
  });
});
