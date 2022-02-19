import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { TalkFactory } from '../core/factories';

async function bootstrap() {
  const application = await NestFactory.createApplicationContext(AppModule);

  Logger.debug('Seeding database...');
  Logger.debug('Creating talks...');
  for (let i = 0; i < 100; i++) {
    const talkFactory: TalkFactory = new TalkFactory();
    Logger.debug(`Creating talk #${i + 1}.`);
    await talkFactory.create();
  }

  await application.close();
  process.exit(0);
}

bootstrap();
