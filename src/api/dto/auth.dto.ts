import { IsString, Length } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @Length(6, 50)
  username: string;

  @IsString()
  @Length(6, 80)
  password: string;
}
