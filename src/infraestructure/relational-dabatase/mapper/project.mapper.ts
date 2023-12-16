import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { ProjectEntity } from './../entity/project.entity';
import { Project } from './../../../domain/model/project.model';
import { ProjectTypeEntityMapper } from './project-type.mapper';
import { UserEntityMapper } from './user.mapper';

@Injectable()
export class ProjectEntityMapper {
  toDomain(entity: ProjectEntity): Project {
    return {
      id: entity._id,
      type: new ProjectTypeEntityMapper().toDomain(entity.type),
      user: new UserEntityMapper().toDomain(entity.user),
      name: entity.name,
      title: entity.title,
      description: entity.description,
      createdAt: new Date(entity.createdAt),
    };
  }

  toCreate(model: Project): DeepPartial<ProjectEntity> {
    return {
      typeId: model.type.id,
      title: model.title,
      name: model.name,
      description: model.description,
    };
  }

  toUpdate(model: Partial<Project>): DeepPartial<ProjectEntity> {
    return {
      _id: model.id,
      title: model.title,
      typeId: model.type ? model.type.id : undefined,
      name: model.name,
      description: model.description,
    };
  }
}
