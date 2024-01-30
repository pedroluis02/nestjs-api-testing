import { RefreshToken } from './../../../domain/model/refresh-token.model';
import { DeepPartial } from 'typeorm';
import { RefreshTokenEntity } from './../entity/refresh-token.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenEntityMapper {
  toDomain(entity: RefreshTokenEntity): RefreshToken {
    return {
      id: entity._id,
      isRevoked: !entity.isActive,
      userId: entity.user._id,
    };
  }

  toCreate(model: RefreshToken): DeepPartial<RefreshTokenEntity> {
    return {};
  }

  toUpdate(model: Partial<RefreshToken>): DeepPartial<RefreshTokenEntity> {
    return {
      isActive: !model.isRevoked,
    };
  }
}
