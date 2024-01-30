import { Injectable } from '@nestjs/common';
import { FDbRefreshTokenEntityMapper } from './../mapper/refresh-token.mapper';
import { RefreshToken } from './../../../domain/model/refresh-token.model';
import { IRefreshTokenRepository } from './../../../domain/repository/refresh-token.interface';
import { FDbRefreshTokenEntity } from './../entity/refresh-token.entity';
import { FDbUserDao } from './../dao/user.dao';

@Injectable()
export class RefreshTokenRepository implements IRefreshTokenRepository {
  constructor(
    private readonly userDao: FDbUserDao,
    private readonly mapper: FDbRefreshTokenEntityMapper,
  ) {}

  private readonly records: FDbRefreshTokenEntity[] = [];

  async findOne(id: string): Promise<RefreshToken | null> {
    const entity = this.records.find((e) => e._id === id);
    if (entity) {
      return this.mapper.toDomain(entity);
    }

    return null;
  }

  async save(model: RefreshToken): Promise<RefreshToken> {
    const entity = this.mapper.toInsert(model);

    const index = this.records.length;

    entity._id = `0000-1111-2222-3333-${index}`;
    entity.id = index;
    entity.user = this.userDao.getCurrent();

    this.records.push(entity);

    return this.mapper.toDomain(entity);
  }

  async update(model: Partial<RefreshToken>): Promise<boolean> {
    const entity = this.mapper.toUpdate(model);

    const storedEntity = this.records.find((e) => e._id === model.id);
    if (storedEntity) {
      storedEntity.isActive = entity.isActive;
      return true;
    }

    return false;
  }
}
