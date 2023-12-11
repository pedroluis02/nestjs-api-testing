import { ProjectType } from './../domain/model/project-type.model';
import { IProjectTypeService } from './../domain/service/project-type.interface';
import { IProjectTypeRepository } from './../domain/repository/project-type.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectTypeService implements IProjectTypeService {
  constructor(private readonly repository: IProjectTypeRepository) {}

  getAll(): ProjectType[] {
    return this.repository.findAlll();
  }

  getOneBy(id: number): ProjectType {
    return this.repository.findOneBy(id);
  }

  create(model: ProjectType): ProjectType {
    return this.repository.save(model);
  }

  update(model: Partial<ProjectType>): void {
    this.repository.update(model);
  }

  delete(id: number): void {
    this.repository.delete(id);
  }
}
