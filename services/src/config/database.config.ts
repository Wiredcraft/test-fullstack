import { registerAs } from '@nestjs/config';
import { parseEnv } from 'src/common/utils/parse-env.util';

export default registerAs('database', () => ({
  host: parseEnv('POSTGRESS_HOST'),
  port: parseEnv('POSTGRESS_PORT', parseInt),
  password: parseEnv('POSTGRESS_PASSWORD'),
  username: parseEnv('POSTGRESS_USER_NAME'),
  db: parseEnv('POSTGRESS_DB'),
}));
