import { IsNotEmpty, IsString, MinLength, IsArray } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  readonly password: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly roles: string[];
}
