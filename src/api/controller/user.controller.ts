import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from './../dto/user.dto';
import { IUserService } from './../../domain/service/user.interface';
import { User } from './../../domain/model/user.model';

@Controller('users')
export class UserController {
  constructor(private readonly service: IUserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateUserDto): Promise<User> {
    const model: User = {
      id: '',
      name: body.name,
      email: body.email,
      username: body.username,
      password: body.username,
    };
    return this.service.create(model);
  }
}
