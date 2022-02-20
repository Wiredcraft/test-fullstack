import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SentryService } from '@ntegral/nestjs-sentry';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './core/filters/global-exception';

const isProd = process.env.NODE_ENV === 'production';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: isProd
      ? process.env.FE_BASE_URL
      : ['http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true,
  });

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const config = new DocumentBuilder()
    .setTitle('Wiredcraft test-fullstack API')
    .setDescription('The backend API for test-fullstack project.')
    .setVersion('0.1')
    .addCookieAuth('fs_jwt')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  app.useLogger(SentryService.SentryServiceInstance());

  await app.listen(process.env.PORT);
}
bootstrap();
