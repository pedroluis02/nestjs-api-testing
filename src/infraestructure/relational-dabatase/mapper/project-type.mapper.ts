import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { ProjectType } from './../../../domain/model/project-type.model';
import { ProjectTypeEntity } from './../entity/project-type.entity';
import { ProjectEntity } from './../entity/project.entity';

@Injectable()
export class ProjectTypeEntityMapper {
  toDomain(entity: ProjectTypeEntity): ProjectType {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
    };
  }

  toCreate(model: ProjectType): DeepPartial<ProjectEntity> {
    return {
      name: model.name,
      description: model.description,
    };
  }

  toUpdate(model: Partial<ProjectType>): DeepPartial<ProjectEntity> {
    return {
      id: model.id,
      name: model.name,
      description: model.description,
    };
  }
}
