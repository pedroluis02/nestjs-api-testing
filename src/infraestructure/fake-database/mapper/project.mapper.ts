import { Injectable } from '@nestjs/common';
import { FDbProjectEntity } from './../entity/project.entity';
import { Project } from './../../../domain/model/project.model';
import { FDbProjectTypeEntityMapper } from './project-type.mapper';
import { FDbUserEntityMapper } from './user.mapper';

@Injectable()
export class FDbProjectEntityMapper {
  /*constructor(
    private readonly userMapper: FDbUserEntityMapper,
    private readonly typeMapper: FDbProjectTypeEntityMapper,
  ) {}*/

  toDomain(entity: FDbProjectEntity): Project {
    return {
      id: entity._id,
      type: new FDbProjectTypeEntityMapper().toDomain(entity.type),
      user: new FDbUserEntityMapper().toDomain(entity.user),
      name: entity.name,
      title: entity.title,
      description: entity.description,
      createdAt: entity.createdAt,
    };
  }

  toInsert(model: Project): FDbProjectEntity {
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

  toUpdate(model: Partial<Project>): Partial<FDbProjectEntity> {
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
