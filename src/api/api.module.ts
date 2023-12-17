import { Module } from '@nestjs/common';
import { ServiceModule } from './../service/service.module';
import { CurrentUserController } from './controller/current-user.controller';
import { GreetingController } from './controller/greeting.controller';
import { ProjecTypeController } from './controller/project-type.controller';
import { UserDtoMapper } from './mapper/user-dto.mapper';
import { ProjectController } from './controller/project.controller';
import { AuthController } from './controller/auth.controller';
import { LocalPasswordStrategy } from './strategy/local-password.strategy';
import { UserController } from './controller/user.controller';

@Module({
  imports: [ServiceModule],
  controllers: [
    GreetingController,
    CurrentUserController,
    ProjecTypeController,
    ProjectController,
    UserController,
    AuthController,
  ],
  providers: [UserDtoMapper, LocalPasswordStrategy],
})
export class ApiModule {}
