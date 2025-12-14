import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IUserRepository } from './../../domain/repository/user.interface';
import { IRefreshTokenRepository } from './../../domain/repository/refresh-token.interface';
import { IProjectTypeRepository } from './../../domain/repository/project-type.interface';
import { IProjectRepository } from './../../domain/repository/project.interface';
import { UserEntity } from './entity/user.entity';
import { RefreshTokenEntity } from './entity/refresh-token.entity';
import { ProjectEntity } from './entity/project.entity';
import { ProjectTypeEntity } from './entity/project-type.entity';
import { UserEntityMapper } from './mapper/user.mapper';
import { RefreshTokenEntityMapper } from './mapper/refresh-token.mapper';
import { ProjectEntityMapper } from './mapper/project.mapper';
import { ProjectTypeEntityMapper } from './mapper/project-type.mapper';
import { UserRepository } from './repository/user.repository';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { ProjectTypeRepository } from './repository/project-type.repository';
import { ProjectRepository } from './repository/project.repository';
import { DatabaseConfigFields } from './../../config/db-options';

const mappers = [
  UserEntityMapper,
  RefreshTokenEntityMapper,
  ProjectTypeEntityMapper,
  ProjectEntityMapper,
];

const entities = [
  UserEntity,
  RefreshTokenEntity,
  ProjectTypeEntity,
  ProjectEntity,
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
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<DatabaseConfigFields>('database').url,
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
