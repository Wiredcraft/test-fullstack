import * as config from 'config';
import { DocumentBuilder, SwaggerBaseConfig } from '@nestjs/swagger';
import { NestApplicationOptions } from '@nestjs/common';
import { JwtModuleOptions } from '@nestjs/jwt';
const serverConfig = config.get('server');
const jwtConfig = config.get('jwt');

const nestApplicationOptions: NestApplicationOptions = {
  logger: serverConfig.loggerLevel,
  cors: serverConfig.cors,
};

const swaggerConfig: SwaggerBaseConfig = new DocumentBuilder()
  .setTitle('API doc')
  .setDescription('description')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

const port = process.env.PORT || serverConfig.port || 3000;

const JwtOptions: JwtModuleOptions = {
  secret: process.env.JWT_SECRET || jwtConfig.secret,
  signOptions: { expiresIn: jwtConfig.expiresIn },
};

export default {
  nestApplicationOptions,
  swaggerConfig,
  port,
  JwtOptions,
};
