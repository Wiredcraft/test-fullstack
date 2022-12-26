import { SignOptions, sign, verify } from 'jsonwebtoken';

export function signJwt<T extends string | object | Buffer>(
  object: T,
  secret: string,
  options?: SignOptions,
) {
  const signingKey = Buffer.from(secret, 'base64').toString('ascii');

  return sign(object, signingKey, { ...options, algorithm: 'HS256' });
}

export function verifyJwt<T>(token: string, secret: string): T | null {
  const publicKey = Buffer.from(secret, 'base64').toString('ascii');

  try {
    return verify(token, publicKey, { complete: false }) as T;
  } catch (e) {
    return null;
  }
}
