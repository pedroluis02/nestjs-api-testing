import { Injectable } from '@nestjs/common';
import { FDbProjectTypeEntity } from './../entity/project-type.entity';
import { ProjectType } from './../../../domain/model/project-type.model';

@Injectable()
export class FDbProjectTypeEntityMapper {
  toDomain(entity: FDbProjectTypeEntity): ProjectType {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
    };
  }

  toInsert(model: ProjectType): FDbProjectTypeEntity {
    return {
      _id: '',
      id: 0,
      name: model.name,
      description: model.description,
    };
  }

  toUpdate(model: Partial<ProjectType>): Partial<FDbProjectTypeEntity> {
    return {
      id: model.id,
      name: model.name,
      description: model.description,
    };
  }
}
