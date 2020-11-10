import { LightningTalkDto } from "./lightning-talk.dto";

export class LightningTalksQueryResultDto {
  maxPageCount: number;
  pageIndex: number;
  data: LightningTalkDto[];
}
