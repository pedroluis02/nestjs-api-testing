import { Injectable } from '@nestjs/common';
import { Project } from './../../../domain/model/project.model';
import { IProjectRepository } from './../../../domain/repository/project.interface';
import { ProjectEntity } from './../entity/project.entity';
import { ProjectTypeDao } from './../dao/project-type.dao';
import { UserDao } from './../dao/user.dao';
import { ProjectEntityMapper } from './../mapper/project.mapper';
import { randomUUID } from 'crypto';

@Injectable()
export class ProjectRepository implements IProjectRepository {
  constructor(
    private readonly userDao: UserDao,
    private readonly typeDao: ProjectTypeDao,
    private readonly mapper: ProjectEntityMapper,
  ) {}

  private readonly projects: ProjectEntity[] = [
    {
      _id: this.createUUID(),
      id: 1,
      type: this.typeDao.findBy(1),
      user: this.userDao.getCurrent(),
      name: 'project-test',
      title: 'Project of Test',
      description: 'NestJS Project',
      createdAt: new Date(),
    },
  ];

  findAll(): Project[] {
    return this.projects.map((e) => this.mapper.toDomain(e));
  }

  findOneBy(id: string): Project {
    const entity = this.projects.find((e) => e._id === id);
    return this.mapper.toDomain(entity);
  }

  save(model: Project): Project {
    const entity = this.mapper.toInsert(model);

    entity._id = this.createUUID();
    entity.id = this.projects.length + 1;
    entity.type = this.typeDao.findBy(model.type.id);
    entity.user = this.userDao.getCurrent();

    this.projects.push(entity);

    return this.mapper.toDomain(entity);
  }

  update(model: Partial<Project>): void {
    const entity = this.mapper.toUpdate(model);

    const storedEntity = this.findEntityBy(model.id);
    if (storedEntity) {
      storedEntity.type = entity.type
        ? this.typeDao.findBy(entity.type.id)
        : storedEntity.type;
      storedEntity.name = entity.name || storedEntity.name;
      storedEntity.title = entity.title || storedEntity.title;
      storedEntity.description = entity.description || storedEntity.description;
    }
  }

  delete(id: string): void {
    const index = this.findIndexEntityBy(id);
    if (index > -1) {
      this.projects.splice(index, 1);
    }
  }

  private createUUID(): string {
    return randomUUID();
  }

  private findEntityBy(id: string): ProjectEntity | undefined {
    return this.projects.find((t, index) => t._id === id);
  }

  private findIndexEntityBy(id: string): number {
    return this.projects.findIndex((t) => t._id === id);
  }
}
