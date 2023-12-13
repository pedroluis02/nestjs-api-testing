import { ProjectType } from './../model/project-type.model';

export abstract class IProjectTypeRepository {
  abstract findAll(): Promise<ProjectType[]>;
  abstract findOne(id: number): Promise<ProjectType | null>;
  abstract save(model: ProjectType): Promise<ProjectType>;
  abstract update(model: Partial<ProjectType>): Promise<ProjectType | null>;
  abstract delete(id: number): Promise<boolean>;
}
