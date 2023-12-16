import { UserCredentials } from './../model/user-credentials';
import { UserLogin } from './../model/user-login.model';

export abstract class IAuthService {
  abstract validateCredentials(
    credentials: UserCredentials,
  ): Promise<UserLogin | null>;
}
