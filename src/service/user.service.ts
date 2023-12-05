import { Inject } from '@nestjs/common';
import { User } from './../domain/model/user.model';
import { IUserRepository } from './../domain/repository/user.interface';
import { IUserService } from './../domain/service/user.interface';

export class UserService implements IUserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly repository: IUserRepository,
  ) {}

  getCurrent = (): User => this.repository.getCurrent();
}
