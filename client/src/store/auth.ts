import { atom, selector } from 'recoil';

import { whoami } from '@/services/auth/whoami';
import { refresh } from '@/services/auth/refresh';

export const mySelector = selector({
  key: 'auth.get.whoami',
  get: () =>
    refresh()
      .then(whoami)
      .catch(() => null),
});

export const myAtom = atom({
  key: 'auth.whoami',
  default: mySelector,
});
