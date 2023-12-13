import { Injectable } from '@nestjs/common';
import { FDbUserEntity } from './../entity/user.entity';

@Injectable()
export class FDbUserDao {
  getCurrent(): FDbUserEntity {
    return { _id: '1', id: 1, name: 'Example', nickname: 'example-user' };
  }
}
