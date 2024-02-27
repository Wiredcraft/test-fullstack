import { Request } from 'express';
import { UserEntity } from 'src/users/entities/user.entity';

export interface CustomRequest extends Request {
  user: UserEntity;
}
