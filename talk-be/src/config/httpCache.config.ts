import * as redisStore from 'cache-manager-redis-store';
import { CacheModuleOptions } from '@nestjs/common';

export const httpCacheOptions: CacheModuleOptions = {
  store: redisStore,
  host: 'localhost',
  port: 6379,
};
