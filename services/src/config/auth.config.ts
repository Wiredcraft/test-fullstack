import { registerAs } from '@nestjs/config';
import { parseEnv } from 'src/common/utils/parse-env.util';
import { parseSaltOrRounds } from 'src/common/utils/parse-salt-rounds.util';

export default registerAs('auth', () => ({
  accessTokenPublicKey: parseEnv('ACCESS_TOKEN_JWT_PUBLIC_KEY'),
  accessTokenPrivateKey: parseEnv('ACCESS_TOKEN_JWT_PRIVATE_KEY'),
  accessTokenExpire: parseEnv(
    'ACCESS_TOKEN_JWT_EXPIRE',
    parseInt,
    // default expire for access token: 3 minutes
    3 * 60,
  ),
  accessTokenAudience: 'web',
  accessTokenIssuer: parseEnv('ACCESS_TOKEN_JWT_ISSUER', 'feedx_at'),

  refreshTokenPublicKey: parseEnv('REFRESH_TOKEN_JWT_PUBLIC_KEY'),
  refreshTokenPrivateKey: parseEnv('REFRESH_TOKEN_JWT_PRIVATE_KEY'),
  refreshTokenExpire: parseEnv(
    'REFRESH_TOKEN_JWT_EXPIRE',
    parseInt,
    // default expire for refresh token: 3 days
    3 * 3600 * 24,
  ),
  refreshTokenIssuer: parseEnv('REFRESH_TOKEN_JWT_ISSUER', 'feedx_rt'),
  refreshTokenAudience: 'web',

  passwordHashSaltOrRounds: parseEnv(
    `BCRYPT_HASH_SALT_OR_ROUNDS`,
    parseSaltOrRounds,
    10,
  ),
}));

// const privateKeyPath = "./keys/rsa_private_key.pem";
// const JWT_SSO_SIGN_PRIVATE_KEY = process.env.JWT_SSO_SIGN_PRIVATE_KEY ||
//                         readFileSync(resolve(privateKeyPath), "utf-8");
