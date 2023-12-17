import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IUserService } from './../../domain/service/user.interface';
import { JWTPayload } from './../../domain/model/jwt-payload.model';
import { UserLogin } from './../../domain/model/user-login.model';

@Injectable()
export class JWTPassportStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: IUserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: getConfigJwtSecret(configService),
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

export function getConfigJwtSecret(service: ConfigService): string {
  return service.get<string>('jwt')['secret'];
}
