import { Injectable } from '@nestjs/common';
import { ProjectEntity } from './../entity/project.entity';
import { Project } from './../../../domain/model/project.model';
import { ProjectTypeEntityMapper } from './project-type.mapper';
import { UserEntityMapper } from './user.mapper';

@Injectable()
export class ProjectEntityMapper {
  constructor(
    private readonly userMapper: UserEntityMapper,
    private readonly typeMapper: ProjectTypeEntityMapper,
  ) {}

  toDomain(entity: ProjectEntity): Project {
    return {
      id: entity._id,
      type: this.typeMapper.toDomain(entity.type),
      user: this.userMapper.toDomain(entity.user),
      name: entity.name,
      title: entity.title,
      description: entity.description,
      createdAt: entity.createdAt,
    };
  }

  toInsert(model: Project): ProjectEntity {
    return {
      _id: '',
      id: 0,
      user: null,
      type: { _id: null, id: model.type.id, name: null, description: '' },
      title: model.title,
      name: model.name,
      description: model.description,
      createdAt: model.createdAt || new Date(),
    };
  }

  toUpdate(model: Partial<Project>): Partial<ProjectEntity> {
    return {
      _id: model.id,
      title: model.title,
      type: model.type
        ? { _id: null, id: model.type.id, name: null, description: '' }
        : null,
      name: model.name,
      description: model.description,
    };
  }
}
