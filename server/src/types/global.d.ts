import { User } from '@prisma/client';

declare global {
  type RequestUser = Pick<User, 'id' | 'username'>;

  namespace Express {
    interface Request {
      user?: RequestUser;
    }
  }
}
