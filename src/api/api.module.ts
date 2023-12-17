import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ServiceModule } from './../service/service.module';
import { GreetingController } from './controller/greeting.controller';
import { ProjecTypeController } from './controller/project-type.controller';
import { UserDtoMapper } from './mapper/user-dto.mapper';
import { ProjectController } from './controller/project.controller';
import { AuthController } from './controller/auth.controller';
import { LocalPasswordStrategy } from './strategy/local-passport.strategy';
import { UserController } from './controller/user.controller';
import {
  JWTPassportStrategy,
  getConfigJwtSecret,
} from './strategy/jwt-passport.strategy';

function getConfigJwtExpiration(service: ConfigService): number {
  return service.get<number>('jwt')['expiresIn'];
}

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: getConfigJwtSecret(configService),
        signOptions: { expiresIn: getConfigJwtExpiration(configService) },
      }),
    }),
    ServiceModule,
  ],
  controllers: [
    GreetingController,
    ProjecTypeController,
    ProjectController,
    UserController,
    AuthController,
  ],
  providers: [UserDtoMapper, LocalPasswordStrategy, JWTPassportStrategy],
})
export class ApiModule {}
