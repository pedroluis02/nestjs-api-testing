import { Injectable } from '@nestjs/common';
import { UserEntity } from './../entity/user.entity';

@Injectable()
export class UserDao {
  getCurrent(): UserEntity {
    return { _id: '1', id: 1, name: 'Example', nickname: 'example-user' };
  }
}
