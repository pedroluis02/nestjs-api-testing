import { ProjectType } from './../model/project-type.model';

export abstract class IProjectTypeRepository {
  abstract findAlll(): ProjectType[];
  abstract findOneBy(id: number): ProjectType | undefined;
  abstract save(model: ProjectType): ProjectType;
  abstract update(model: Partial<ProjectType>): void;
  abstract delete(id: number): void;
}
