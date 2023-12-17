import { Injectable } from '@nestjs/common';
import { User } from './../../../domain/model/user.model';
import { FDbUserEntity } from './../entity/user.entity';

@Injectable()
export class FDbUserEntityMapper {
  toDomain(entity: FDbUserEntity): User {
    return {
      id: entity._id,
      name: entity.name,
      email: entity.email,
      username: entity.username,
      password: entity.password,
    };
  }

  toInsert(model: User): FDbUserEntity {
    return {
      name: model.name,
      email: model.email,
      username: model.username,
      password: model.password,
    };
  }

  toUpdate(model: Partial<User>): Partial<FDbUserEntity> {
    return {
      _id: model.id,
      name: model.name,
      email: model.email,
      username: model.username,
      password: model.password,
    };
  }
}
