import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IUserService } from './../../domain/service/user.interface';
import { JWTPayload } from './../../domain/model/jwt-payload.model';
import { UserLogin } from './../../domain/model/user-login.model';

export class JWTPassportStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: IUserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  async validate(jwtPaylod: JWTPayload): Promise<UserLogin> {
    const userId = jwtPaylod.sub;
    const model = await this.userService.getOne(userId);

    if (model) {
      return this.userService.toUserLogin(model);
    }

    throw new UnauthorizedException();
  }
}
