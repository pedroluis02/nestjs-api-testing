import { Project } from './../model/project.model';

export abstract class IProjectRepository {
  abstract findAll(): Project[];
  abstract findOneBy(id: string): Project | undefined;
  abstract save(model: Project): Project;
  abstract update(model: Partial<Project>): void;
  abstract delete(id: string): void;
}
