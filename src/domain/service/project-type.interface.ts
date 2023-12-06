import { ProjectType } from './../model/project-type.model';

export const PROJECT_TYPE_SERVICE = 'PROJECT_TYPE_SERVICE';

export interface IProjectTypeService {
  getAll(): ProjectType[];
  getOneBy(id: number): ProjectType;
  create(model: ProjectType): ProjectType;
  update(model: Partial<ProjectType>): void;
  delete(id: number): void;
}
