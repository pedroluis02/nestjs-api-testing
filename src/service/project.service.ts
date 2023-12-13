import { Injectable } from '@nestjs/common';
import { Project } from './../domain/model/project.model';
import { IProjectService } from './../domain/service/project.interface';
import { IProjectRepository } from './../domain/repository/project.interface';

@Injectable()
export class ProjectService implements IProjectService {
  constructor(private readonly repository: IProjectRepository) {}

  getAll(): Promise<Project[]> {
    return this.repository.findAll();
  }

  getOne(id: string): Promise<Project | null> {
    return this.repository.findOne(id);
  }

  create(model: Project): Promise<Project> {
    return this.repository.save(model);
  }

  update(model: Partial<Project>): Promise<Project | null> {
    return this.repository.update(model);
  }

  delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
