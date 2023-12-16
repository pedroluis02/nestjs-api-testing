import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IUserRepository } from './../../domain/repository/user.interface';
import { IProjectTypeRepository } from './../../domain/repository/project-type.interface';
import { IProjectRepository } from './../../domain/repository/project.interface';

import { ProjectEntity } from './entity/project.entity';
import { ProjectTypeEntity } from './entity/project-type.entity';
import { UserEntity } from './entity/user.entity';
import { ProjectTypeRepository } from './repository/project-type.repository';
import { UserRepository } from './repository/user.repository';
import { ProjectRepository } from './repository/project.repository';
import { UserEntityMapper } from './mapper/user.mapper';
import { ProjectEntityMapper } from './mapper/project.mapper';
import { ProjectTypeEntityMapper } from './mapper/project-type.mapper';

const mappers = [
  UserEntityMapper,
  ProjectTypeEntityMapper,
  ProjectEntityMapper,
];

const entities = [UserEntity, ProjectTypeEntity, ProjectEntity];

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
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService) => ({
        ...configService.get('database'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    TypeOrmModule.forFeature(entities),
  ],
  providers: [...mappers, ...providers],
  exports: providers,
})
export class RelationalDatabaseModule {}
