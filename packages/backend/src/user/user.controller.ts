import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  DataSuccessResponse,
  SimpleErrorResponse,
  SimpleSuccessResponse,
} from 'src/response.model';
import { users as USERS } from 'src/test.data';

@Controller('user')
export class UserController {
  @Post('/signin')
  signin(
    @Res({ passthrough: true }) res: Response,
    @Body('name') name: string,
    @Body('password') password: string,
  ) {
    const user = USERS.find(
      (user) => user.name === name && user.password === password,
    );
    if (user) {
      const token = Buffer.from(
        JSON.stringify({ name: user.name, id: user.id }),
      ).toString('base64');
      return new DataSuccessResponse(token);
    } else {
      return new SimpleErrorResponse(404);
    }
  }

  @Post('/signup')
  signup(@Body('name') name: string, @Body('password') password: string) {
    const index = USERS.findIndex((user) => user.name === name);
    if (index !== -1) {
      return new SimpleErrorResponse(500);
    }
    USERS.push({
      id: USERS[USERS.length - 1]['id'] + 1,
      name,
      password,
    });
    return new SimpleSuccessResponse();
  }
}
