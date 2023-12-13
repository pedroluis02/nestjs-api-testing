import { Injectable } from '@nestjs/common';
import { User } from './../domain/model/user.model';
import { IUserRepository } from './../domain/repository/user.interface';
import { IUserService } from './../domain/service/user.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly repository: IUserRepository) {}

  getCurrent(): Promise<User> {
    return this.repository.getCurrent();
  }
}
