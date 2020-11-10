import { Injectable, NestMiddleware, Logger, LoggerService } from '@nestjs/common';
import * as expressWinston from 'express-winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);
  private readonly expressLogger = expressWinston.logger({
    winstonInstance: <any>this.logger,
    meta: false,
    expressFormat: true,
  });

  use(req, res, next) {
    this.expressLogger(req, res, next);
  }
}
