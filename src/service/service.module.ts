import { Module, Provider } from '@nestjs/common';
import { UserService } from './user.service';
import { FakeDatabaseModule } from './../infraestructure/fake-database/database.module';
import { DomainModule } from './../domain/domain.module';
import { IUserService } from './../domain/service/user.interface';

const providers: Provider[] = [
  {
    provide: IUserService,
    useClass: UserService,
  },
];

@Module({
  imports: [DomainModule, FakeDatabaseModule],
  providers: providers,
  exports: providers,
})
export class ServiceModule {}
