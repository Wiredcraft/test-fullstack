import { Controller, Get } from '@nestjs/common';
import { DataSuccessResponse } from 'src/response.model';
import { talks as TALKS } from 'src/test.data';

@Controller('talks')
export class TalksController {
  @Get('/all')
  all() {
    return new DataSuccessResponse(TALKS);
  }
}
