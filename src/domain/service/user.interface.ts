import { UserLogin } from './../model/user-login.model';
import { UserCredentials } from './../model/user-credentials';
import { User } from './../model/user.model';

export abstract class IUserService {
  abstract getOne(id: string): Promise<User | null>;
  abstract validateCredentials(
    credentials: UserCredentials,
  ): Promise<UserLogin | null>;
  abstract create(model: User): Promise<User>;
  abstract update(model: Partial<User>): Promise<User>;
  abstract toUserLogin(model: User): UserLogin;
}
