import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthModule } from './auth.module';
import { User, UserDocument } from '@libs/db/models/user.model';
import * as dotenv from 'dotenv';
import { DbModule } from '@libs/db';
import { CommonModule } from '@libs/common';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { async } from 'rxjs/internal/scheduler/async';
import { DeleteUserDto } from './dtos/delete.dto';
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

  it('POST/ register', async () => {
    const username = Math.random().toString(36).substr(2);
    const params = {
      userName: username,
      password: '123456'
    } as RegisterDto;
    const res = await controller.register(params);
    expect(res).toMatchObject({});
  });

  it('POST/ login', async () => {
    const params = {
      userName: 'admin',
      password: '123456'
    } as LoginDto;
    const user = {} as UserDocument;
    const res = await controller.login(params, user);
    expect(res).toMatchObject({});
  });

  it('GET/ user', async () => {
    const user = {} as UserDocument;
    const res = await controller.getUser(user);
    expect(res).toMatchObject({});
  });

  it('GET/ users', async () => {
    const res = await controller.getUsers();
    expect(res).toMatchObject({});
  });

  it('DELETE/ user', async () => {
    const users = await controller.getUsers();
    const size = users.length;
    const index = Math.floor(Math.random() * size);
    const params = {
      id: users[index]._id
    } as DeleteUserDto
    const res = await controller.deleteOneUser(params);
    expect(res).toMatchObject({});
  });
});
