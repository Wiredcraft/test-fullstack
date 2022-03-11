import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { LightningTalk } from "./entity/LightningTalk.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/lightning-talks")
  async getLightningTalks(): Promise<LightningTalk[]> {
    return await this.appService.getTalks();
  }

  @Post("/lightning-talk")
  async addLightningTalk(
    @Body() talk: Pick<LightningTalk, "user" | "title" | "description">
  ): Promise<LightningTalk> {
    return await this.appService.addTalk(talk);
  }

  @Post("/lightning-talk/:id/poll")
  async addPoll(@Param("id", ParseIntPipe) talkId: number): Promise<boolean> {
    return await this.appService.addPoll(talkId);
  }
}
