import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ServiceModule } from './../service/service.module';
import { GreetingController } from './controller/greeting.controller';
import { ProjecTypeController } from './controller/project-type.controller';
import { ProjectController } from './controller/project.controller';
import { AuthController } from './controller/auth.controller';
import { UserAuthStrategy } from './strategy/user-auth.strategy';
import { UserController } from './controller/user.controller';
import { AccessTokenStrategy } from './strategy/access-token.strategy';
import { RefreshTokenStrategy } from './strategy/refresh-token.strategy';

@Module({
  imports: [JwtModule.register({}), ServiceModule],
  controllers: [
    GreetingController,
    ProjecTypeController,
    ProjectController,
    UserController,
    AuthController,
  ],
  providers: [UserAuthStrategy, AccessTokenStrategy, RefreshTokenStrategy],
})
export class ApiModule {}
