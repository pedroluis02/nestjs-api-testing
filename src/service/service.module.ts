import { Module, Provider } from '@nestjs/common';
import { IUserService } from './../domain/service/user.interface';
import { PROJECT_TYPE_SERVICE } from './../domain/service/project-type.interface';
import { FakeDatabaseModule } from './../infraestructure/fake-database/fake-database.module';
import { DomainModule } from './../domain/domain.module';
import { UserService } from './user.service';
import { ProjectTypeService } from './project-type.service';

const providers: Provider[] = [
  {
    provide: IUserService,
    useClass: UserService,
  },
  {
    provide: PROJECT_TYPE_SERVICE,
    useClass: ProjectTypeService,
  },
];

@Module({
  imports: [DomainModule, FakeDatabaseModule],
  providers: providers,
  exports: providers,
})
export class ServiceModule {}
