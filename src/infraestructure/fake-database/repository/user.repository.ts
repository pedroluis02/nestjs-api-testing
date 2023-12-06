import { Injectable } from '@nestjs/common';
import { User } from './../../../domain/model/user.model';
import { IUserRepository } from './../../../domain/repository/user.interface';
import { UserDao } from './../dao/user.dao';
import { UserEntityMapper } from './../mapper/user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private readonly dao: UserDao,
    private readonly mapper: UserEntityMapper,
  ) {}

  getCurrent(): User {
    const entity = this.dao.getCurrent();
    return this.mapper.toDomain(entity);
  }
}
