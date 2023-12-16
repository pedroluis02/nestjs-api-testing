import { TestingModule } from '@nestjs/testing';
import { buildTestingModule } from './test-module';
import { IProjectTypeRepository } from './../../../domain/repository/project-type.interface';
import { ProjectType } from './../../../domain/model/project-type.model';

describe('ProjectTypeRepository', () => {
  let module: TestingModule;
  let repository: IProjectTypeRepository;

  let modelId: number;

  beforeAll(async () => {
    module = await buildTestingModule();
    repository = module.get(IProjectTypeRepository);
  });

  it('save', async () => {
    const model: ProjectType = { id: 0, name: 'test-name-1', description: '' };
    const result = await repository.save(model);
    modelId = result.id;

    expect(result.id).toBe(1);
  });

  it('find-one', async () => {
    const model = await repository.findOne(modelId);

    expect(model).not.toBeNull();
    expect(model.id).toBe(modelId);
  });

  it('update', async () => {
    const updateModel: Partial<ProjectType> = {
      id: modelId,
      name: 'test-new-name-1',
      description: 'Test new description',
    };
    const model = await repository.update(updateModel);

    expect(model).not.toBeNull();
    expect(model.name).toBe(updateModel.name);
    expect(model.description).toBe(updateModel.description);
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
