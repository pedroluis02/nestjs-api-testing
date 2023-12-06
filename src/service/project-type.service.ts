import { ProjectType } from './../domain/model/project-type.model';
import { IProjectTypeService } from './../domain/service/project-type.interface';
import {
  IProjectTypeRepository,
  PROJECT_TYPE_REPOSITORY,
} from './../domain/repository/project-type.interface';
import { Inject } from '@nestjs/common';

export class ProjectTypeService implements IProjectTypeService {
  constructor(
    @Inject(PROJECT_TYPE_REPOSITORY)
    private readonly repository: IProjectTypeRepository,
  ) {}

  getAll(): ProjectType[] {
    return this.repository.findAlll();
  }

  create(model: ProjectType): ProjectType {
    return this.repository.insert(model);
  }
}
