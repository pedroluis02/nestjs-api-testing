import { Module, Provider } from '@nestjs/common';
import { IUserService } from './../domain/service/user.interface';
import { IProjectTypeService } from './../domain/service/project-type.interface';
import { IProjectService } from './../domain/service/project.interface';
import { IAuthService } from './../domain/service/auth.interface';
import { FakeDatabaseModule } from './../infraestructure/fake-database/fake-database.module';
import { DomainModule } from './../domain/domain.module';
import { UserService } from './user.service';
import { ProjectTypeService } from './project-type.service';
import { ProjectService } from './project.service';
import { AuthService } from './auth.service';

const providers: Provider[] = [
  {
    provide: IUserService,
    useClass: UserService,
  },
  {
    provide: IProjectTypeService,
    useClass: ProjectTypeService,
  },
  {
    provide: IProjectService,
    useClass: ProjectService,
  },
  {
    provide: IAuthService,
    useClass: AuthService,
  },
];

@Module({
  imports: [DomainModule, FakeDatabaseModule],
  providers: providers,
  exports: providers,
})
export class ServiceModule {}
