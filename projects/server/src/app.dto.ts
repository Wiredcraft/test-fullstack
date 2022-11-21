import { IsString } from "class-validator";

export class TalksSortDto {
  @IsString()
  orderBy?: string;

  @IsString()
  order?: "ASC" | "DESC";
}
