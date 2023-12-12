import { Project } from './../model/project.model';

export abstract class IProjectService {
  abstract getAll(): Project[];
  abstract getOneBy(id: string): Project;
  abstract create(model: Project): Project;
  abstract update(model: Partial<Project>): void;
  abstract delete(id: string): void;
}
