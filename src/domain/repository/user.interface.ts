import { User } from './../model/user.model';

export abstract class IUserRepository {
  abstract getCurrent(): User;
}
