import { IsEmail, IsNumberString, IsOptional, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @IsString()
  email: string;

  @MinLength(10)
  password: string;

  @IsOptional()
  @IsNumberString()
  tfaCode?: string;
}
