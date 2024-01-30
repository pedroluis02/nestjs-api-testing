import { Injectable } from '@nestjs/common';
import { FDbRefreshTokenEntity } from './../entity/refresh-token.entity';
import { RefreshToken } from './../../../domain/model/refresh-token.model';

@Injectable()
export class FDbRefreshTokenEntityMapper {
  toDomain(entity: FDbRefreshTokenEntity): RefreshToken {
    return {
      id: entity._id,
      isRevoked: !entity.isActive,
      userId: entity.user._id,
    };
  }

  toInsert(model: RefreshToken): FDbRefreshTokenEntity {
    return {
      isActive: true,
    };
  }

  toUpdate(model: Partial<RefreshToken>): Partial<FDbRefreshTokenEntity> {
    return {
      isActive: !model.isRevoked,
    };
  }
}
