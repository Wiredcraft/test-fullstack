import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('api')
@Controller({
  version: VERSION_NEUTRAL,
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Health check endpoint.',
  })
  @ApiResponse({
    status: 200,
    description: 'Everything is a-ok.',
  })
  @Get('health')
  health(): string {
    return 'ok';
  }
}
