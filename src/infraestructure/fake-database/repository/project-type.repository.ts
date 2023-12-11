import { Injectable } from '@nestjs/common';
import { ProjectType } from './../../../domain/model/project-type.model';
import { IProjectTypeRepository } from './../../../domain/repository/project-type.interface';
import { ProjectTypeDao } from './../dao/project-type.dao';
import { ProjectTypeEntityMapper } from './../mapper/project-type.mapper';

@Injectable()
export class ProjectTypeRepository implements IProjectTypeRepository {
  constructor(
    private readonly dao: ProjectTypeDao,
    private readonly mapper: ProjectTypeEntityMapper,
  ) {}

  findAlll(): ProjectType[] {
    const entities = this.dao.findAll();
    return entities.map((e) => this.mapper.toDomain(e));
  }

  findOneBy(id: number): ProjectType | undefined {
    const entity = this.dao.findBy(id);
    return this.mapper.toDomain(entity);
  }

  save(model: ProjectType): ProjectType {
    const entity = this.mapper.toInsert(model);
    const storedEntity = this.dao.insert(entity);

    model.id = storedEntity.id;
    return model;
  }

  update(model: Partial<ProjectType>): void {
    const entity = this.mapper.toUpdate(model);
    this.dao.update(entity);
  }

  delete(id: number): void {
    this.dao.delete(id);
  }
}
