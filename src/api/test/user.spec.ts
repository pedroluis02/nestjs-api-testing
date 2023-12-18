import { Test } from '@nestjs/testing';
import { IUserService } from './../../domain/service/user.interface';
import { UserController } from './../controller/user.controller';

describe('UserController', () => {
  let controller: UserController;
  let service: IUserService;

  let serviceMock = {
    getOne: (id: string) => Promise.resolve({ id: id, name: 'name 1' }),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: IUserService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get(UserController);
    service = module.get(IUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call service.getOne once', async () => {
    const spyService = jest.spyOn(service, 'getOne');
    const paramId = 'new-id-1';
    await controller.getOne(paramId);

    expect(spyService).toHaveBeenCalledWith(paramId);
    expect(spyService).toHaveBeenCalledTimes(1);
  });
});
