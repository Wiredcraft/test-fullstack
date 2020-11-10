import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserLoginParamDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}
