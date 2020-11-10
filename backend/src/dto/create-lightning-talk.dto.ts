import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLightningTalkDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
}
