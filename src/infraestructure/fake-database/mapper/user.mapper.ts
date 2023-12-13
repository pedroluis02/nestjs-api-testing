import { Injectable } from '@nestjs/common';
import { User } from './../../../domain/model/user.model';
import { FDbUserEntity } from './../entity/user.entity';

@Injectable()
export class FDbUserEntityMapper {
  toDomain(entity: FDbUserEntity): User {
    return { id: entity._id, name: entity.name };
  }
}
