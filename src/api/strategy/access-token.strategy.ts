import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IUserService } from './../../domain/service/user.interface';
import { AccessTokenPayload } from './../../domain/model/access-token.model';
import { UserLogin } from './../../domain/model/user-login.model';
import { JwtConfigFields } from './../../config/jwt-model';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userService: IUserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<JwtConfigFields>('jwt').secret,
    });
  }

  async validate(jwtPaylod: AccessTokenPayload): Promise<UserLogin> {
    const userId = jwtPaylod.sub;
    const model = await this.userService.getOne(userId);

    if (model) {
      return this.userService.toUserLogin(model);
    }

    throw new UnauthorizedException();
  }
}
