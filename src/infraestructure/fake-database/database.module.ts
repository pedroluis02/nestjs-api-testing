import { Module, Provider } from '@nestjs/common';
import { IUserRepository } from './../../domain/repository/user.interface';
import { PROJECT_TYPE_REPOSITORY } from './../../domain/repository/project-type.interface';
import { UserEntityMapper } from './mapper/user.mapper';
import { UserDao } from './dao/user.dao';
import { UserRepository } from './repository/user.repository';
import { ProjectTypeRepository } from './repository/project-type.repository';

const providers: Provider[] = [
  {
    provide: IUserRepository,
    useClass: UserRepository,
  },
  {
    provide: PROJECT_TYPE_REPOSITORY,
    useClass: ProjectTypeRepository,
  },
];

@Module({
  providers: [UserDao, UserEntityMapper, ...providers],
  exports: providers,
})
export class FakeDatabaseModule {}
