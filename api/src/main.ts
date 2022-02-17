import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const origin = ['127.0.0.1', 'localhost'];

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://127.0.0.1:3000',
    credentials: true,
  });

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Wiredcraft test-fullstack API')
    .setDescription('The backend API for test-fullstack project.')
    .setVersion('0.1')
    .addTag('test-fullstack')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  await app.listen(3001);
}
bootstrap();
