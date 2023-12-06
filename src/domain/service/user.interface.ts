import { User } from './../model/user.model';

export abstract class IUserService {
  abstract getCurrent(): User;
}
