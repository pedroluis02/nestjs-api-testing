import { Module, Provider } from '@nestjs/common';
import { IUserRepository } from './../../domain/repository/user.interface';
import { UserRepository } from './repository/user.repository';
import { UserEntityMapper } from './mapper/user.mapper';
import { UserDao } from './dao/user.dao';

const providers: Provider[] = [
  {
    provide: IUserRepository,
    useClass: UserRepository,
  },
];

@Module({
  providers: [UserDao, UserEntityMapper, ...providers],
  exports: providers,
})
export class FakeDatabaseModule {}
