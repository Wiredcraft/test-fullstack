import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty()
  userName: string;
  @ApiProperty()
  password: string;
}