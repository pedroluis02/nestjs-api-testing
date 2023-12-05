import { User } from './../../../domain/model/user.model';
import { UserEntity } from './../entity/user.entity';

export class UserEntityMapper {
  toDomain = (entity: UserEntity): User => new User(entity.id, entity.name);
}
