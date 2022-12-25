import { atom, selector } from 'recoil';

import { whoami } from '@/services/auth/whoami';

export const mySelector = selector({
  key: 'auth.get.whoami',
  get: () => whoami().catch(() => null),
});

export const myAtom = atom({
  key: 'auth.whoami',
  default: mySelector,
});
