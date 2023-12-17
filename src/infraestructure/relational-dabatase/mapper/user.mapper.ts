import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { User } from './../../../domain/model/user.model';
import { UserEntity } from './../entity/user.entity';

@Injectable()
export class UserEntityMapper {
  toDomain(entity: UserEntity): User {
    return {
      id: entity._id,
      name: entity.name,
      email: entity.email,
      username: entity.username,
      password: entity.password,
    };
  }

  toCreate(model: User): DeepPartial<UserEntity> {
    return {
      name: model.name,
      email: model.email,
      username: model.username,
      password: model.password,
    };
  }

  toUpdate(model: Partial<User>): DeepPartial<UserEntity> {
    return {
      _id: model.id,
      name: model.name,
      email: model.email,
      username: model.username,
      password: model.password,
    };
  }
}
