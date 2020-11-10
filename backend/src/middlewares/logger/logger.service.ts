import { Inject, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger, createLogger, transports, format } from 'winston';

export class MyLogger implements LoggerService {
  private logger: Logger;

  constructor(@Inject(ConfigService) config: ConfigService) {
    this.logger = createLogger({
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
      ),
      transports: [
        new transports.Console({
          level: 'debug',
        }),
        new transports.File({
          filename: config.get('LOG_FILE'),
          level: 'info',
        }),
      ],
    });
  }

  log(message: string) {
    return this.logger.info(message);
  }

  error(message: string, trace: string) {
    return this.logger.error(message, trace);
  }

  warn(message: string) {
    return this.logger.warn(message);
  }

  debug(message: string) {
    return  this.logger.debug(message);
  }
}
