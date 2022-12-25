import { join } from '@/utils/path';

const BASE = '/';

export const SEGMENT = {
  HOME: '/',
  TALKS: 'talks',
  LOGIN: 'login',
  SUBMIT: 'submit',
};

export const HOME = BASE;
export const LOGIN = join(BASE, SEGMENT.LOGIN);

export const TALKS = join(BASE, SEGMENT.TALKS);
export const TALKS_SUBMIT = join(TALKS, SEGMENT.SUBMIT);
