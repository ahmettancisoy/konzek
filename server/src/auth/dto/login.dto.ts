import { IsNotEmpty, IsString } from 'class-validator';

export class LogInDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
