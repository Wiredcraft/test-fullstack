import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthModule } from './auth.module';
import { User } from '@libs/db/models/user.model';
import * as dotenv from 'dotenv';
import { DbModule } from '@libs/db';
import { CommonModule } from '@libs/common';
dotenv.config();

describe('Auth Controller', () => {
  let controller: AuthController;
  let user : User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, DbModule, CommonModule],
      controllers: [AuthController],
      providers: []
    })
    .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('post/ create a poll', () => {
    expect([1,2,3]).toEqual([1,2,3])
  })
});
