import { User } from 'src/domain/model/user.model';
import { CurrentUserDto } from '../dto/currentUser.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserDtoMapper {
  fromDomain = (model: User): CurrentUserDto =>
    new CurrentUserDto(model.id, model.name);
}
