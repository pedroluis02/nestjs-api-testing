import { Module, Provider } from '@nestjs/common';
import { IUserRepository } from './../../domain/repository/user.interface';
import { IProjectTypeRepository } from './../../domain/repository/project-type.interface';
import { IProjectRepository } from './../../domain/repository/project.interface';
import { UserEntityMapper } from './mapper/user.mapper';
import { UserDao } from './dao/user.dao';
import { UserRepository } from './repository/user.repository';
import { ProjectTypeRepository } from './repository/project-type.repository';
import { ProjectRepository } from './repository/project.repository';
import { ProjectTypeDao } from './dao/project-type.dao';
import { ProjectTypeEntityMapper } from './mapper/project-type.mapper';

const daos = [UserDao, ProjectTypeDao];

const mappers = [UserEntityMapper, ProjectTypeEntityMapper];

const providers: Provider[] = [
  {
    provide: IUserRepository,
    useClass: UserRepository,
  },
  {
    provide: IProjectTypeRepository,
    useClass: ProjectTypeRepository,
  },
  {
    provide: IProjectRepository,
    useClass: ProjectRepository,
  },
];

@Module({
  providers: [...daos, ...mappers, ...providers],
  exports: providers,
})
export class FakeDatabaseModule {}
