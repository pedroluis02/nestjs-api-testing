import { Injectable } from '@nestjs/common';
import { FDbUserEntity } from './../entity/user.entity';

@Injectable()
export class FDbUserDao {
  private readonly users: FDbUserEntity[] = [
    {
      _id: '1',
      id: 1,
      name: 'Example',
      email: 'example-user@example.com',
      username: 'example-user',
      password: 'example-user',
      encryptedPasword: false,
    },
  ];

  findAll(): FDbUserEntity[] {
    return this.users;
  }

  getCurrent(): FDbUserEntity {
    return this.findOne('1');
  }

  findOne(id: string): FDbUserEntity | null {
    const entity = this.users.find((t) => t._id === id);
    return entity ? entity : null;
  }

  findOneByUsername(username: string): FDbUserEntity | null {
    const entity = this.users.find((t) => t.username === username);
    return entity ? entity : null;
  }

  findIndex(id: string): number {
    return this.users.findIndex((t) => t._id === id);
  }

  insert(entity: FDbUserEntity): FDbUserEntity {
    const newId = this.users.length + 1;
    entity._id = newId.toString();
    entity.id = newId;

    this.users.push(entity);

    return entity;
  }

  delete(id: string) {
    const index = this.findIndex(id);
    if (index > -1) {
      this.users.splice(index, 1);
      return true;
    }

    return false;
  }
}
