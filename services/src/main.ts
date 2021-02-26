import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { APP_NAME } from './common/constants';
import { ENTRY_CONFIG } from './entry-providers/entry-config';
import { Security } from './entry-providers/security';
import { Swagger } from './entry-providers/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');
  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // Setup bunch of security middlewares
  const security = app.get(Security);
  security.setup();

  // Setup swagger
  const swaggerProvider = app.get(Swagger);
  const swaggerDoccument = SwaggerModule.createDocument(
    app,
    swaggerProvider.getDocumentOptions(),
  );
  SwaggerModule.setup(
    swaggerProvider.basePath,
    app,
    swaggerDoccument,
    swaggerProvider.getSetupOptions(),
  );

  // Use global scope entry config
  const entryConfig = app.get<ConfigService>(ENTRY_CONFIG);
  // And serve
  await app.listen(parseInt(entryConfig.get<string>('APP_PORT'), 10));
  // TODO: Use a logger
  console.log(`${APP_NAME} is running on: ${await app.getUrl()}`);
}
module.exports = bootstrap();
