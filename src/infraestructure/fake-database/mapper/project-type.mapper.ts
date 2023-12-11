import { Injectable } from '@nestjs/common';
import { ProjectTypeEntity } from './../entity/project-type.entity';
import { ProjectType } from './../../../domain/model/project-type.model';

@Injectable()
export class ProjectTypeEntityMapper {
  toDomain(entity: ProjectTypeEntity): ProjectType {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
    };
  }

  toInsert(model: ProjectType): ProjectTypeEntity {
    return {
      _id: '',
      id: 0,
      name: model.name,
      description: model.description,
    };
  }

  toUpdate(model: Partial<ProjectType>): Partial<ProjectTypeEntity> {
    return {
      id: model.id,
      name: model.name,
      description: model.description,
    };
  }
}
