import { Injectable } from '@nestjs/common';
import { User } from './../../../domain/model/user.model';
import { IUserRepository } from './../../../domain/repository/user.interface';
import { FDbUserDao } from './../dao/user.dao';
import { FDbUserEntityMapper } from './../mapper/user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private readonly dao: FDbUserDao,
    private readonly mapper: FDbUserEntityMapper,
  ) {}

  async getCurrent(): Promise<User> {
    const entity = this.dao.getCurrent();
    return this.mapper.toDomain(entity);
  }
}
