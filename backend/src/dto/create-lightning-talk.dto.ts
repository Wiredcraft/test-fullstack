import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NoLeadingOrLailingSpace } from 'src/decorators/no-leading-or-tailing-space.decorator';

export class CreateLightningTalkDto {
  @ApiProperty()
  @MaxLength(64)
  @NoLeadingOrLailingSpace()
  @IsNotEmpty()
  @IsString()
  title: string;
}
