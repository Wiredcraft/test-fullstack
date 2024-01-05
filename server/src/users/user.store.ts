import { AsyncLocalStorage } from 'async_hooks';
import { User } from '@prisma/client';

export const UserStorage = {
  storage: new AsyncLocalStorage<User>(),
  get(): User | null | undefined {
    return this.storage.getStore();
  },
  set(user: User) {
    return this.storage.enterWith(user);
  },
};
