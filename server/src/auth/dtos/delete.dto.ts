import { ApiProperty } from "@nestjs/swagger";

export class DeleteUserDto {
  @ApiProperty()
  id: string;
}