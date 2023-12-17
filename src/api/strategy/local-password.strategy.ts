import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { IAuthService } from './../../domain/service/auth.interface';
import { UserCredentials } from './../../domain/model/user-credentials';

@Injectable()
export class LocalPasswordStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: IAuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const credentials: UserCredentials = {
      username: username,
      password: password,
    };
    const userLogin = await this.authService.validateCredentials(credentials);
    if (userLogin) {
      return userLogin;
    }

    throw new UnauthorizedException();
  }
}
