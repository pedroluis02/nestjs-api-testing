import { Controller, Get } from '@nestjs/common';
import { IUserService } from './../../domain/service/user.interface';
import { CurrentUserDto } from './../dto/current-user.dto';
import { UserDtoMapper } from './../mapper/user-dto.mapper';

@Controller('current-user')
export class CurrentUserController {
  constructor(
    private readonly service: IUserService,
    private readonly mapper: UserDtoMapper,
  ) {}

  @Get()
  async get(): Promise<CurrentUserDto> {
    const model = await this.service.getCurrent();
    return this.mapper.fromDomain(model);
  }
}
