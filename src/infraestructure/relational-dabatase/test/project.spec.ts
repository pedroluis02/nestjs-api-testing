import { TestingModule } from '@nestjs/testing';
import { buildTestingModule } from './test-module';
import { IUserRepository } from './../../../domain/repository/user.interface';
import { IProjectTypeRepository } from './../../../domain/repository/project-type.interface';
import { IProjectRepository } from './../../../domain/repository/project.interface';
import { Project } from './../../../domain/model/project.model';
import { ProjectType } from './../../../domain/model/project-type.model';
import { User } from './../../../domain/model/user.model';

describe('ProjectRepository', () => {
  let module: TestingModule;
  let repository: IProjectRepository;

  let modelId: string;

  let typeModel: ProjectType;
  let userModel: User;

  beforeAll(async () => {
    module = await buildTestingModule();
    repository = module.get(IProjectRepository);

    const userRepo = module.get(IUserRepository);
    const typeRepo = module.get(IProjectTypeRepository);

    typeModel = await typeRepo.save({
      id: 0,
      name: 'type-1',
      description: 'type 1',
    });

    userModel = await userRepo.save({
      id: '',
      name: 'User 1',
      email: 'user1@example.com',
      username: 'user-1',
      password: 'user1',
    });
  });

  it('save', async () => {
    const model: Project = {
      id: '',
      name: 'test-name-1',
      title: 'test-title',
      description: 'Test 1',
      type: typeModel,
      user: userModel,
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
    const updateModel: Partial<Project> = {
      id: modelId,
      name: 'test-new-name-1',
      title: 'test-new-title-1',
    };
    const model = await repository.update(updateModel);

    expect(model).not.toBeNull();
    expect(model.name).toBe(updateModel.name);
    expect(model.title).toBe(updateModel.title);
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
