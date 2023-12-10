import { Injectable } from '@nestjs/common';
import { User } from './../../domain/model/user.model';
import { CurrentUserDto } from './../dto/current-user.dto';

@Injectable()
export class UserDtoMapper {
  fromDomain(model: User): CurrentUserDto {
    return { id: model.id, name: model.name, fullName: model.name };
  }
}
