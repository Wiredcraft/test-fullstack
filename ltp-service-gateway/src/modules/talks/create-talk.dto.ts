import { IsString, MinLength } from 'class-validator'

export class CreateTalkDto {
  @IsString({ message: 'Title must be a string' })
  @MinLength(5, { message: 'Title should be longer than 5' })
  title: string

  @MinLength(5, { message: 'Description should be longer than 5.' })
  description: string

  userId?: string
}