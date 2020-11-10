import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLightningTalkDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
}
