import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IUserService } from './../../domain/service/user.interface';
import { RefreshTokenPayload } from './../../domain/model/refresh-token.model';
import { UserLogin } from './../../domain/model/user-login.model';
import { JwtConfigFields } from './../../config/jwt-model';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly userService: IUserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<JwtConfigFields>('jwtRefresh').secret,
    });
  }

  async validate(jwtPaylod: RefreshTokenPayload): Promise<UserLogin> {
    const userId = jwtPaylod.sub;
    const model = await this.userService.getOne(userId);

    if (model) {
      const userLogin = this.userService.toUserLogin(model);
      userLogin.refreshTokenId = jwtPaylod.jti;

      return userLogin;
    }

    throw new ForbiddenException();
  }
}
