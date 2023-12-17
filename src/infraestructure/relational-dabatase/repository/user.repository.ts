import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './../../../domain/model/user.model';
import { IUserRepository } from './../../../domain/repository/user.interface';
import { UserEntity } from './../entity/user.entity';
import { UserEntityMapper } from './../mapper/user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly dataSource: Repository<UserEntity>,
    private readonly mapper: UserEntityMapper,
  ) {}
  async findAll(): Promise<User[]> {
    const entities = await this.dataSource.find();
    return entities.map(this.mapper.toDomain);
  }

  getCurrent(): Promise<User> {
    return this.findOne('<id>');
  }

  async findOne(id: string): Promise<User | null> {
    const entity = await this.dataSource.findOneBy({ _id: id });
    if (entity) {
      return this.mapper.toDomain(entity);
    }

    return null;
  }

  async findOneByUsername(username: string): Promise<User | null> {
    const entity = await this.dataSource.findOneBy({ username: username });
    if (entity) {
      const model = this.mapper.toDomain(entity);
      model.password = entity.password;
      return model;
    }

    return null;
  }

  async save(model: User): Promise<User> {
    const entity = this.dataSource.create(this.mapper.toCreate(model));
    const stored = await this.dataSource.save(entity);

    return this.mapper.toDomain(stored);
  }

  async update(model: Partial<User>): Promise<User | null> {
    const entity = this.mapper.toUpdate(model);

    const tmpEntity = await this.dataSource
      .createQueryBuilder('user')
      .select(['user.id'])
      .where('user._id = :id', { id: model.id })
      .getOne();

    entity.id = tmpEntity.id;
    const preloaded = await this.dataSource.preload(entity);
    if (preloaded) {
      const updated = await this.dataSource.save(preloaded);
      return this.mapper.toDomain(updated);
    }

    return null;
  }

  async delete(id: string): Promise<boolean> {
    const entity = await this.dataSource.findOneBy({ _id: id });
    if (entity) {
      const result = await this.dataSource.delete(entity);
      return result.affected > 0;
    }

    return false;
  }
}
