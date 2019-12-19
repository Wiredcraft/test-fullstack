import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @ApiModelProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiModelProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password is to weak',
  // })
  password: string;
}
