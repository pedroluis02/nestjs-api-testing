import { Injectable } from '@nestjs/common';
import { ProjectType } from './../domain/model/project-type.model';
import { IProjectTypeService } from './../domain/service/project-type.interface';
import { IProjectTypeRepository } from './../domain/repository/project-type.interface';

@Injectable()
export class ProjectTypeService implements IProjectTypeService {
  constructor(private readonly repository: IProjectTypeRepository) {}

  getAll(): Promise<ProjectType[]> {
    return this.repository.findAll();
  }

  getOne(id: number): Promise<ProjectType | null> {
    return this.repository.findOne(id);
  }

  create(model: ProjectType): Promise<ProjectType> {
    return this.repository.save(model);
  }

  update(model: Partial<ProjectType>): Promise<ProjectType | null> {
    return this.repository.update(model);
  }

  delete(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}
