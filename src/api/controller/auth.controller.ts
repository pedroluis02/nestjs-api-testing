import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserLoginDto, UserTokensDto } from './../dto/auth.dto';
import { ITokenService } from './../../domain/service/token.interface';
import { UserAuthGuard } from './../guard/user-auth.guard';
import { UserLoginAuth } from './../decorator/user-login.decorator';
import { UserLogin } from './../../domain/model/user-login.model';
import { RefreshTokenGuard } from './../guard/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: ITokenService) {}

  @Post('/login')
  @UseGuards(UserAuthGuard)
  login(
    @Body() body: UserLoginDto,
    @UserLoginAuth() userLogin: UserLogin,
  ): Promise<UserTokensDto> {
    return this.createTokens(userLogin);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('/refresh')
  async refreshAcessToken(
    @UserLoginAuth() userLogin: UserLogin,
  ): Promise<UserTokensDto> {
    await this.service.revokeRefreshToken(userLogin);
    return this.createTokens(userLogin);
  }

  private async createTokens(user: UserLogin): Promise<UserTokensDto> {
    return {
      type: 'Bearer',
      accessToken: await this.service.createAccessToken(user),
      refreshToken: await this.service.createRefreshToken(user),
    };
  }
}
