import { Module } from '@nestjs/common';
import { ServiceModule } from './../service/service.module';
import { CurrentUserController } from './controller/current-user.controller';
import { GreetingController } from './controller/greeting.controller';
import { ProjecTypeController } from './controller/project-type.controller';
import { UserDtoMapper } from './mapper/user-dto.mapper';
import { ProjectController } from './controller/project.controller';

@Module({
  imports: [ServiceModule],
  controllers: [
    GreetingController,
    CurrentUserController,
    ProjecTypeController,
    ProjectController,
  ],
  providers: [UserDtoMapper],
})
export class ApiModule {}
