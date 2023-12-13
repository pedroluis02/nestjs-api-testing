import { Injectable } from '@nestjs/common';
import { Project } from './../../../domain/model/project.model';
import { IProjectRepository } from './../../../domain/repository/project.interface';
import { FDbProjectEntity } from './../entity/project.entity';
import { FDbProjectTypeDao } from './../dao/project-type.dao';
import { FDbUserDao } from './../dao/user.dao';
import { FDbProjectEntityMapper } from './../mapper/project.mapper';
import { randomUUID } from 'crypto';

@Injectable()
export class ProjectRepository implements IProjectRepository {
  constructor(
    private readonly userDao: FDbUserDao,
    private readonly typeDao: FDbProjectTypeDao,
    private readonly mapper: FDbProjectEntityMapper,
  ) {}

  private readonly projects: FDbProjectEntity[] = [
    {
      _id: this.createUUID(),
      id: 1,
      type: this.typeDao.findOne(1),
      user: this.userDao.getCurrent(),
      name: 'project-test',
      title: 'Project of Test',
      description: 'NestJS Project',
      createdAt: new Date(),
    },
  ];

  async findAll(): Promise<Project[]> {
    return this.projects.map(this.mapper.toDomain);
  }

  async findOne(id: string): Promise<Project | null> {
    const entity = this.projects.find((e) => e._id === id);
    if (entity) {
      return this.mapper.toDomain(entity);
    }

    return null;
  }

  async save(model: Project): Promise<Project> {
    const entity = this.mapper.toInsert(model);

    entity._id = this.createUUID();
    entity.id = this.projects.length + 1;
    entity.type = this.typeDao.findOne(model.type.id);
    entity.user = this.userDao.getCurrent();

    this.projects.push(entity);

    return this.mapper.toDomain(entity);
  }

  async update(model: Partial<Project>): Promise<Project | null> {
    const entity = this.mapper.toUpdate(model);

    const storedEntity = this.findEntity(model.id);
    if (storedEntity) {
      storedEntity.type = entity.type
        ? this.typeDao.findOne(entity.type.id)
        : storedEntity.type;
      storedEntity.name = entity.name || storedEntity.name;
      storedEntity.title = entity.title || storedEntity.title;
      storedEntity.description = entity.description || storedEntity.description;

      return this.mapper.toDomain(storedEntity);
    }

    return null;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.findIndexEntity(id);
    if (index > -1) {
      this.projects.splice(index, 1);
      return true;
    }

    return false;
  }

  private createUUID(): string {
    return randomUUID();
  }

  private findEntity(id: string): FDbProjectEntity | undefined {
    return this.projects.find((t, index) => t._id === id);
  }

  private findIndexEntity(id: string): number {
    return this.projects.findIndex((t) => t._id === id);
  }
}
