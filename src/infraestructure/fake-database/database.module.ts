import { Module, Provider } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';

const providers: Provider[] = [
  {
    provide: 'USER_REPOSITORY',
    useClass: UserRepository,
  },
];

@Module({
  providers: providers,
  exports: providers,
})
export class FakeDatabaseModule {}
