import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MyLogger } from './middlewares/logger/logger.service';
import { BizExceptionFilter } from './filters/biz-exception.filter';
import { NormalizeResponseInterceptor } from './interceptors/normalize-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(MyLogger));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new BizExceptionFilter());
  app.useGlobalInterceptors(new NormalizeResponseInterceptor());

  const options = new DocumentBuilder()
    .setTitle('Ligntning Talks')
    .setDescription('The Ligntning Talks API description')
    .setVersion('0.0.1')
    .addTag('lightning-talk')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-front', app, document);

  await app.listen(3000);
}
bootstrap();
