import { Length, MinLength } from 'class-validator';

export class CreateTalkDto {
  @Length(4, 64)
  title: string;

  @Length(10, 140)
  description: string;
}
