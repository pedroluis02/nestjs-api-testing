import { Project } from './../model/project.model';

export abstract class IProjectService {
  abstract getAll(): Promise<Project[]>;
  abstract getOne(id: string): Promise<Project | null>;
  abstract create(model: Project): Promise<Project>;
  abstract update(model: Partial<Project>): Promise<Project | null>;
  abstract delete(id: string): Promise<boolean>;
}
