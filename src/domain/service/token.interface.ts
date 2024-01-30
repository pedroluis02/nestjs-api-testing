import { UserLogin } from './../model/user-login.model';

export abstract class ITokenService {
  abstract createAccessToken(user: UserLogin): Promise<string>;
  abstract createRefreshToken(user: UserLogin): Promise<string>;
  abstract revokeRefreshToken(user: UserLogin): Promise<boolean>;
}
