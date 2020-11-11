import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UploadLightningTalkQueryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string;
}
