import {
  CacheInterceptor,
  CacheTTL,
  Controller,
  ExecutionContext,
  Get,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

@Injectable()
class HttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();
    const { httpAdapter } = this.httpAdapterHost;
    // const isGetRequest = httpAdapter.getRequestMethod(request) === 'GET';
    // cache by url
    const url = httpAdapter.getRequestUrl(request);
    return url;
  }
}

@ApiUseTags('health check')
@Controller()
export class AppController {
  @Get()
  // cache http result
  @CacheTTL(1)
  @UseInterceptors(HttpCacheInterceptor)
  healthCheck(): string {
    return 'OK';
  }
}
