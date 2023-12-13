import { ProjectType } from './../model/project-type.model';

export abstract class IProjectTypeService {
  abstract getAll(): Promise<ProjectType[]>;
  abstract getOne(id: number): Promise<ProjectType | null>;
  abstract create(model: ProjectType): Promise<ProjectType>;
  abstract update(model: Partial<ProjectType>): Promise<ProjectType | null>;
  abstract delete(id: number): Promise<boolean>;
}
