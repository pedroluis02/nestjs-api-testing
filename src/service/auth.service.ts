import { IUserService } from './../domain/service/user.interface';
import { UserLogin } from './../domain/model/user-login.model';
import { IAuthService } from './../domain/service/auth.interface';
import { UserCredentials } from './../domain/model/user-credentials';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly userService: IUserService) {}

  validateCredentials(credentials: UserCredentials): Promise<UserLogin> {
    return this.userService.validateCredentials(credentials);
  }
}
