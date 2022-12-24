import { join } from '@/utils/path';

const BASE = '/';

export const SEGMENT = {
  HOME: '/',
  TALKS: 'talks',
  LOGIN: 'login',
};

export const HOME = BASE;
export const LOGIN = join(BASE, SEGMENT.LOGIN);
export const TALKS = join(BASE, SEGMENT.TALKS);
