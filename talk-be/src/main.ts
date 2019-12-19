import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { AppModule } from './app/app.module';
import appConfig from './config/app.config';

const { nestApplicationOptions, swaggerConfig, port } = appConfig;

// tslint:disable-next-line:no-import-side-effect
// import './testDecorator';
// tslint:disable-next-line:no-import-side-effect
// import './testMetadata';

async function bootstrap() {
  const logger = new Logger('main: bootstrap');
  const app = await NestFactory.create(AppModule, nestApplicationOptions);
  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, swaggerConfig));
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
