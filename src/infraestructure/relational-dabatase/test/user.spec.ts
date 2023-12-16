import { TestingModule } from '@nestjs/testing';
import { buildTestingModule } from './test-module';
import { IUserRepository } from './../../../domain/repository/user.interface';
import { User } from './../../../domain/model/user.model';

describe('UserRepository', () => {
  let module: TestingModule;
  let repository: IUserRepository;
  let modelId: string;

  beforeAll(async () => {
    module = await buildTestingModule();
    repository = module.get(IUserRepository);
  });

  it('save', async () => {
    const model: User = {
      id: '',
      name: 'test-name-1',
      email: 'test@exampple.com',
      username: 'test',
      password: 'test',
    };
    const result = await repository.save(model);
    modelId = result.id;

    expect(result.id.length).toBeGreaterThan(0);
  });

  it('find-one', async () => {
    const model = await repository.findOne(modelId);

    expect(model).not.toBeNull();
    expect(model.id).toBe(modelId);
  });

  it('update', async () => {
    const updateModel: Partial<User> = {
      id: modelId,
      name: 'test-new-name-1',
      email: 'new-test@exampple.com',
    };
    const model = await repository.update(updateModel);

    expect(model).not.toBeNull();
    expect(model.name).toBe(updateModel.name);
    expect(model.email).toBe(updateModel.email);
  });

  it('find-all', async () => {
    const models = await repository.findAll();

    expect(models.length).toBe(1);
  });

  it('delete', async () => {
    const result = await repository.delete(modelId);
    expect(result).toBeTruthy();

    const entity = await repository.findOne(modelId);
    expect(entity).toBeNull();
  });

  afterAll(async () => {});
});
