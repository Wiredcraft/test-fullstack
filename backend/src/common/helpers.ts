import { createHmac } from 'crypto';

export function nowInSeconds() {
    return Math.floor(Date.now() / 1000);
}

export function pwdHash(pwd) {
    if (!process.env.PASSWORD_SALT) {
        throw new Error('PASSWORD_SALT is missing in .env file!')
    }
    return createHmac('sha256', process.env.PASSWORD_SALT).update(pwd).digest('hex');
}
