import { Injectable } from '@nestjs/common';
import { IUserService } from './../domain/service/user.interface';
import { IAuthService } from './../domain/service/auth.interface';
import { UserLogin } from './../domain/model/user-login.model';
import { UserCredentials } from './../domain/model/user-credentials';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly userService: IUserService) {}

  validateCredentials(credentials: UserCredentials): Promise<UserLogin> {
    return this.userService.validateCredentials(credentials);
  }
}
