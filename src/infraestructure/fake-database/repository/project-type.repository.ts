import { Injectable } from '@nestjs/common';
import { ProjectType } from './../../../domain/model/project-type.model';
import { IProjectTypeRepository } from './../../../domain/repository/project-type.interface';
import { FDbProjectTypeDao } from './../dao/project-type.dao';
import { FDbProjectTypeEntityMapper } from './../mapper/project-type.mapper';

@Injectable()
export class ProjectTypeRepository implements IProjectTypeRepository {
  constructor(
    private readonly dao: FDbProjectTypeDao,
    private readonly mapper: FDbProjectTypeEntityMapper,
  ) {}

  async findAll(): Promise<ProjectType[]> {
    const entities = this.dao.findAll();
    return entities.map(this.mapper.toDomain);
  }

  async findOne(id: number): Promise<ProjectType | null> {
    const entity = this.dao.findOne(id);
    if (entity) {
      return this.mapper.toDomain(entity);
    }

    return null;
  }

  async save(model: ProjectType): Promise<ProjectType> {
    const entity = this.mapper.toInsert(model);
    const storedEntity = this.dao.insert(entity);

    model.id = storedEntity.id;
    return model;
  }

  async update(model: Partial<ProjectType>): Promise<ProjectType | null> {
    const entity = this.mapper.toUpdate(model);
    const updated = this.dao.update(entity);
    if (updated) {
      return this.mapper.toDomain(updated);
    }

    return null;
  }

  async delete(id: number): Promise<boolean> {
    return this.dao.delete(id);
  }
}
