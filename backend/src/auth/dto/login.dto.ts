import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  id: string;

  @IsString()
  @MinLength(8)
  password: string;
}