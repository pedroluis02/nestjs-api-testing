import { Test } from '@nestjs/testing';
import { IUserService } from './../../domain/service/user.interface';
import { IAuthService } from './../../domain/service/auth.interface';
import { ServiceModule } from '../service.module';
import { User } from './../../domain/model/user.model';
import { UserCredentials } from './../../domain/model/user-credentials';

describe('AuthService', () => {
  let userSerice: IUserService;
  let service: IAuthService;

  const credentials: UserCredentials = {
    username: 'user1',
    password: 'user1',
  };
  const userInputModel: User = {
    id: '',
    name: 'user 1',
    email: 'user-1@example.com',
    username: credentials.username,
    password: credentials.password,
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ServiceModule],
    }).compile();

    userSerice = module.get(IUserService);
    service = module.get(IAuthService);

    await userSerice.create(userInputModel);
  });

  it('should be validate credentials', async () => {
    const result = await service.validateCredentials(credentials);

    expect(result).not.toBeNull();
  });
});
