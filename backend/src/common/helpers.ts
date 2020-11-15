import { createHmac } from 'crypto';

export function nowInSeconds() {
  return Math.floor(Date.now() / 1000);
}

export function pwdHash(pwd, salt) {
  if (!salt) {
    throw new Error('Password salt is missing')
  }
  return createHmac('sha256', salt).update(pwd).digest('hex');
}
