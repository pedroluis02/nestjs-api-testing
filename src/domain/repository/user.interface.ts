import { User } from './../model/user.model';

export abstract class IUserRepository {
  abstract findAll(): Promise<User[]>;
  abstract getCurrent(): Promise<User>;
  abstract findOne(id: string): Promise<User>;
  abstract save(model: User): Promise<User>;
  abstract update(model: Partial<User>): Promise<User>;
  abstract delete(id: string): Promise<boolean>;
}
