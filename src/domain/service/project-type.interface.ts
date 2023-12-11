import { ProjectType } from './../model/project-type.model';

export abstract class IProjectTypeService {
  abstract getAll(): ProjectType[];
  abstract getOneBy(id: number): ProjectType;
  abstract create(model: ProjectType): ProjectType;
  abstract update(model: Partial<ProjectType>): void;
  abstract delete(id: number): void;
}
