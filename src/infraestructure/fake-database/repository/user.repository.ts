import { Injectable } from '@nestjs/common';
import { User } from './../../../domain/model/user.model';
import { IUserRepository } from './../../../domain/repository/user.interface';
import { FDbUserDao } from './../dao/user.dao';
import { FDbUserEntityMapper } from './../mapper/user.mapper';
import { UserLogin } from './../../../domain/model/user-login.model';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private readonly dao: FDbUserDao,
    private readonly mapper: FDbUserEntityMapper,
  ) {}

  async findAll(): Promise<User[]> {
    const entities = this.dao.findAll();
    return entities.map(this.mapper.toDomain);
  }

  async findOne(id: string): Promise<User | null> {
    const entity = this.dao.findOne(id);
    if (entity) {
      return this.mapper.toDomain(entity);
    }

    return null;
  }

  async findOneByUsername(username: string): Promise<User | null> {
    const entity = this.dao.findOneByUsername(username);
    if (entity) {
      const model = this.mapper.toDomain(entity);
      model.password = entity.password;
      return model;
    }

    return null;
  }

  async save(model: User): Promise<User> {
    const entity = this.mapper.toInsert(model);
    const storedEntity = this.dao.insert(entity);

    return this.mapper.toDomain(storedEntity);
  }

  async update(model: Partial<User>): Promise<User | null> {
    const entity = this.mapper.toUpdate(model);

    const storedEntity = this.dao.findOne(model.id);
    if (storedEntity) {
      storedEntity.name = entity.name || storedEntity.name;
      storedEntity.email = entity.email || storedEntity.email;
      storedEntity.username = entity.username || storedEntity.username;
      storedEntity.password = entity.password || storedEntity.password;

      return this.mapper.toDomain(storedEntity);
    }

    return null;
  }

  async delete(id: string): Promise<boolean> {
    return this.dao.delete(id);
  }
}
