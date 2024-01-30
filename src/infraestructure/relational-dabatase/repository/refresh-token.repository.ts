import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from './../../../domain/model/refresh-token.model';
import { IRefreshTokenRepository } from './../../../domain/repository/refresh-token.interface';
import { UserEntity } from './../entity/user.entity';
import { RefreshTokenEntity } from './../entity/refresh-token.entity';
import { RefreshTokenEntityMapper } from './../mapper/refresh-token.mapper';

@Injectable()
export class RefreshTokenRepository implements IRefreshTokenRepository {
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private readonly dataSource: Repository<RefreshTokenEntity>,
    @InjectRepository(UserEntity)
    private readonly userDataSource: Repository<UserEntity>,
    private readonly mapper: RefreshTokenEntityMapper,
  ) {}

  async findOne(id: string): Promise<RefreshToken | null> {
    const entity = await this.dataSource.findOneBy({ _id: id });
    if (entity) {
      return this.mapper.toDomain(entity);
    }

    return null;
  }

  async save(model: RefreshToken): Promise<RefreshToken> {
    const entity = this.dataSource.create(this.mapper.toCreate(model));
    const storedUser = await this.userDataSource.findOneBy({
      _id: model.userId,
    });

    entity.userId = storedUser.id;
    const stored = await this.dataSource.save(entity);

    return this.mapper.toDomain(stored);
  }

  async update(model: Partial<RefreshToken>): Promise<boolean> {
    const entity = this.mapper.toUpdate(model);
    const stored = await this.dataSource.findOneBy({ _id: model.id });

    entity.id = stored.id;
    const preloaded = await this.dataSource.preload(entity);
    if (preloaded) {
      await this.dataSource.save(preloaded);
      return true;
    }

    return false;
  }
}
