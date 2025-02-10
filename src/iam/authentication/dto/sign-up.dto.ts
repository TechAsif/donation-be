import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  email: string;

  @MinLength(10)
  password: string;
}