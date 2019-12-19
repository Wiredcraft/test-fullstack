import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmOptions } from '../config/typeorm.config';
import { httpCacheOptions } from '../config/httpCache.config';
import { AppController } from './app.controller';
import { AuthModule } from '../auth/auth.module';
import { TalksModule } from '../talks/talks.module';
@Module({
  imports: [
    // TypeOrmModule
    TypeOrmModule.forRoot(typeOrmOptions),
    // http cache to redis
    CacheModule.register(httpCacheOptions),
    // auth
    AuthModule,
    // talk
    TalksModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
