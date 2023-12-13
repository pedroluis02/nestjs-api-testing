import { Project } from './../model/project.model';

export abstract class IProjectRepository {
  abstract findAll(): Promise<Project[]>;
  abstract findOne(id: string): Promise<Project | null>;
  abstract save(model: Project): Promise<Project>;
  abstract update(model: Partial<Project>): Promise<Project | null>;
  abstract delete(id: string): Promise<boolean>;
}
