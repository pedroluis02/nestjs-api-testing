import { Injectable } from '@nestjs/common';
import { User } from './../../../domain/model/user.model';
import { UserEntity } from './../entity/user.entity';

@Injectable()
export class UserEntityMapper {
  toDomain(entity: UserEntity): User {
    return { id: entity._id, name: entity.name };
  }
}
