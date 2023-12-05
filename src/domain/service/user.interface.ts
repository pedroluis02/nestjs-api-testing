import { User } from './../model/user.model';

export interface IUserService {
  getCurrent(): User;
}
