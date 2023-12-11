import { Module, Provider } from '@nestjs/common';
import { IUserService } from './../domain/service/user.interface';
import { IProjectTypeService } from './../domain/service/project-type.interface';
import { IProjectService } from './../domain/service/project.interface';
import { FakeDatabaseModule } from './../infraestructure/fake-database/fake-database.module';
import { DomainModule } from './../domain/domain.module';
import { UserService } from './user.service';
import { ProjectTypeService } from './project-type.service';
import { ProjectService } from './project.service';

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
];

@Module({
  imports: [DomainModule, FakeDatabaseModule],
  providers: providers,
  exports: providers,
})
export class ServiceModule {}
