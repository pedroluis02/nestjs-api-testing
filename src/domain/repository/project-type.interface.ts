import { ProjectType } from './../model/project-type.model';

export const PROJECT_TYPE_REPOSITORY = 'PROJECT_TYPE_REPOSITORY';

export interface IProjectTypeRepository {
  findAlll(): ProjectType[];
  findOneBy(id: number): ProjectType | undefined;
  insert(model: ProjectType): ProjectType;
  update(model: Partial<ProjectType>): void;
  delete(id: number): void;
}
