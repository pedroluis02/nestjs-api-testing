import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './../domain/model/user.model';
import { IUserRepository } from './../domain/repository/user.interface';
import { IUserService } from './../domain/service/user.interface';
import { UserCredentials } from './../domain/model/user-credentials';
import { UserLogin } from './../domain/model/user-login.model';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly repository: IUserRepository) {}
  getAll(): Promise<User[]> {
    return this.repository.findAll();
  }

  getOne(id: string): Promise<User> {
    return this.repository.findOne(id);
  }

  async validateCredentials(credentials: UserCredentials): Promise<UserLogin> {
    const model = await this.repository.findOneByUsername(credentials.username);
    if (
      model &&
      (await this.compareEncryptedField(credentials.password, model.password))
    ) {
      return this.toUserLogin(model);
    }

    return null;
  }

  async create(model: User): Promise<User> {
    model.password = await this.encryptField(model.password);
    return this.repository.save(model);
  }

  async update(model: Partial<User>): Promise<User> {
    if (model.password) {
      model.password = await this.encryptField(model.password);
    }
    return this.repository.update(model);
  }

  delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  toUserLogin(model: User): UserLogin {
    return {
      id: model.id,
      email: model.email,
      username: model.username,
    };
  }

  private async compareEncryptedField(
    value: string,
    encrypted: string,
  ): Promise<boolean> {
    return bcrypt.compare(value, encrypted);
  }

  private async encryptField(value: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(value, salt);
  }
}
