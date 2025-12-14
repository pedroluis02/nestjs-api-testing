import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  RefreshToken,
  RefreshTokenPayload,
} from './../domain/model/refresh-token.model';
import { ITokenService } from './../domain/service/token.interface';
import { IRefreshTokenRepository } from './../domain/repository/refresh-token.interface';
import { UserLogin } from './../domain/model/user-login.model';
import { JwtConfigFields } from './../config/jwt-model';
import { AccessTokenPayload } from './../domain/model/access-token.model';

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    private readonly repository: IRefreshTokenRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createAccessToken(user: UserLogin): Promise<string> {
    const config = this.configService.get<JwtConfigFields>('jwt');

    const payload: AccessTokenPayload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };

    return this.jwtService.sign(payload, config);
  }

  async createRefreshToken(user: UserLogin): Promise<string> {
    const config = this.configService.get<JwtConfigFields>('jwtRefresh');

    const model: RefreshToken = { id: '', isRevoked: false, userId: user.id };
    const result = await this.repository.save(model);

    const payload: RefreshTokenPayload = {
      sub: user.id,
      jti: result.id,
    };

    return this.jwtService.sign(payload, config);
  }

  async revokeRefreshToken(user: UserLogin): Promise<boolean> {
    return this.repository.update({ id: user.refreshTokenId, isRevoked: true });
  }
}
