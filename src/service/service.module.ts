import { Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { IUserService } from './../domain/service/user.interface';
import { IAuthService } from './../domain/service/auth.interface';
import { ITokenService } from './../domain/service/token.interface';
import { IProjectTypeService } from './../domain/service/project-type.interface';
import { IProjectService } from './../domain/service/project.interface';
import { DomainModule } from './../domain/domain.module';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { ProjectTypeService } from './project-type.service';
import { ProjectService } from './project.service';
import { RelationalDatabaseModule } from './../infraestructure/relational-dabatase/relational-dabatase.module';

const providers: Provider[] = [
  {
    provide: IUserService,
    useClass: UserService,
  },
  {
    provide: IAuthService,
    useClass: AuthService,
  },
  {
    provide: ITokenService,
    useClass: TokenService,
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
  imports: [JwtModule.register({}), DomainModule, RelationalDatabaseModule],
  providers: providers,
  exports: providers,
})
export class ServiceModule {}
