import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Response } from 'express';
import { BizException } from 'src/exceptions';

@Catch(BizException)
export class BizExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(BizExceptionFilter.name);

  catch(exception: BizException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception.statusCode === 200) {
      this.logger.debug(`${exception.code}, message: ${exception.message}`);
    } else {
      this.logger.verbose(`${exception.code}, message: ${exception.message}`);
    }

    response.status(exception.statusCode);
    response.json({
      statusCode: exception.statusCode,
      error: exception.code,
      message: [exception.message],
    });
  }
}
