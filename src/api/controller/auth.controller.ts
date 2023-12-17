import { JwtService } from '@nestjs/jwt';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserLoginDto } from './../dto/auth.dto';
import { IAuthService } from './../../domain/service/auth.interface';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { UserLoginAuth } from './../decorator/user-login.decorator';
import { UserLogin } from './../../domain/model/user-login.model';
import { JWTPayload } from './../../domain/model/jwt-payload.model';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: IAuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  login(
    @Body() body: UserLoginDto,
    @UserLoginAuth() userLogin: UserLogin,
  ): Promise<string> {
    return this.createAccessToken(userLogin);
  }

  async createAccessToken(user: UserLogin): Promise<string> {
    const payload: JWTPayload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };

    return this.jwtService.sign(payload);
  }
}
