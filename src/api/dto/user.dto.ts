import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 50)
  username: string;

  @IsString()
  @Length(6, 80)
  password: string;
}
