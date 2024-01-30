import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './../dto/user.dto';
import { IUserService } from './../../domain/service/user.interface';
import { User } from './../../domain/model/user.model';
import { AccessTokenGuard } from './../guard/access-token.guard';

@Controller('users')
@UseGuards(AccessTokenGuard)
export class UserController {
  constructor(private readonly service: IUserService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.service.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<User> {
    const model = await this.service.getOne(id);
    if (!model) {
      throw new NotFoundException();
    }

    return model;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateUserDto): Promise<User> {
    const model: User = {
      id: '',
      name: body.name,
      email: body.email,
      username: body.username,
      password: body.password,
    };
    return this.service.create(model);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    const model: Partial<User> = {
      id: id,
      name: body.name,
      email: body.email,
      username: body.username,
      password: body.password,
    };

    const updated = await this.service.update(model);
    if (!updated) {
      throw new NotFoundException();
    }

    return updated;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string): Promise<boolean> {
    return this.service.delete(id);
  }
}
