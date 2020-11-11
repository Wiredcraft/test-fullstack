import { Body, Controller, Logger, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Ctx, Payload, NatsContext } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateUploadUriDto } from 'src/dto/create-upload-uri.dto';
import { UploadLightningTalkQueryDto } from 'src/dto/upload-lightning-talk-query.dto';
import { UploadLightningTalkDataDto } from 'src/dto/upload-lightning-talk-data.dto';
import { UploadService } from 'src/services/upload/upload.service';

@ApiTags('lightning-talks-upload')
@Controller()
export class UploadController {
  private readonly logger = new Logger(UploadController.name);

  constructor(private uploadService: UploadService) { }

  @MessagePattern({ cmd: 'create-upload-uri' })
  createUploadUri(@Payload() data: CreateUploadUriDto, @Ctx() context: NatsContext) {
    return this.uploadService.createUploadUri(data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Post a lightning talk.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string'
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseGuards(AuthGuard())
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@Req() request, @Query() q: UploadLightningTalkQueryDto, @Body() data: UploadLightningTalkDataDto, @UploadedFile() file) {
    return this.uploadService.upload(q, data, file, request.user);
  }
}
