import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { LightningTalk } from "./entity/LightningTalk.entity";

import { TalksSortDto } from "./app.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/talks")
  async getLightningTalks(
    @Query() query: TalksSortDto,
    @Req() request
  ): Promise<LightningTalk[]> {
    return await this.appService.getTalks(query, request.session.id);
  }

  @Post("/talk")
  async addLightningTalk(
    @Body() talk: Pick<LightningTalk, "author" | "title" | "content">
  ): Promise<LightningTalk> {
    return await this.appService.createTalk(talk);
  }

  @Put("/talk/:id/poll")
  async updateTalkPoll(
    @Param("id", ParseIntPipe) id: number,
    @Req() request
  ): Promise<boolean> {
    return await this.appService.updateTalkPoll(id, request.session.id);
  }
}
