import jwt from 'jsonwebtoken';

export function signJwt(object: object, secret: string, options?: jwt.SignOptions) {
  const signingKey = Buffer.from(secret, 'base64').toString('ascii');

  return jwt.sign(object, signingKey, { ...options, algorithm: 'HS256' });
}

export function verifyJwt<T>(token: string, secret: string): T | null {
  const publicKey = Buffer.from(secret, 'base64').toString('ascii');

  try {
    return jwt.verify(token, publicKey, { complete: false }) as T;
  } catch (e) {
    return null;
  }
}
