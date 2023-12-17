import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserLoginDto } from './../dto/auth.dto';
import { IAuthService } from './../../domain/service/auth.interface';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { UserLoginAuth } from './../decorator/user-login.decorator';
import { UserLogin } from './../../domain/model/user-login.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: IAuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  login(@Body() body: UserLoginDto, @UserLoginAuth() userLogin: UserLogin) {
    return 'logn ok';
  }
}
