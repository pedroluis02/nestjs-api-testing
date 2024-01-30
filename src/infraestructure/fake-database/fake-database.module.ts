import { Module, Provider } from '@nestjs/common';
import { IUserRepository } from './../../domain/repository/user.interface';
import { IRefreshTokenRepository } from './../../domain/repository/refresh-token.interface';
import { IProjectTypeRepository } from './../../domain/repository/project-type.interface';
import { IProjectRepository } from './../../domain/repository/project.interface';
import { FDbUserEntityMapper } from './mapper/user.mapper';
import { FDbProjectTypeEntityMapper } from './mapper/project-type.mapper';
import { FDbProjectEntityMapper } from './mapper/project.mapper';
import { FDbRefreshTokenEntityMapper } from './mapper/refresh-token.mapper';
import { FDbUserDao } from './dao/user.dao';
import { UserRepository } from './repository/user.repository';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { ProjectTypeRepository } from './repository/project-type.repository';
import { ProjectRepository } from './repository/project.repository';
import { FDbProjectTypeDao } from './dao/project-type.dao';

const daos = [FDbUserDao, FDbProjectTypeDao];

const mappers = [
  FDbUserEntityMapper,
  FDbRefreshTokenEntityMapper,
  FDbProjectTypeEntityMapper,
  FDbProjectEntityMapper,
];

const providers: Provider[] = [
  {
    provide: IUserRepository,
    useClass: UserRepository,
  },
  {
    provide: IRefreshTokenRepository,
    useClass: RefreshTokenRepository,
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
  providers: [...mappers, ...daos, ...providers],
  exports: providers,
})
export class FakeDatabaseModule {}
