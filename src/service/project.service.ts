import { Injectable } from '@nestjs/common';
import { Project } from './../domain/model/project.model';
import { IProjectService } from './../domain/service/project.interface';
import { IProjectRepository } from './../domain/repository/project.interface';

@Injectable()
export class ProjectService implements IProjectService {
  constructor(private readonly repository: IProjectRepository) {}

  getAll(): Project[] {
    return this.repository.findAll();
  }

  getOneBy(id: string): Project {
    return this.repository.findOneBy(id);
  }

  create(model: Project): Project {
    return this.repository.save(model);
  }

  update(model: Partial<Project>): void {
    this.repository.update(model);
  }

  delete(id: string): void {
    this.repository.delete(id);
  }
}
