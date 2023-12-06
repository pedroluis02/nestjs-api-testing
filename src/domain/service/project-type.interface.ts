import { ProjectType } from './../model/project-type.model';

export const PROJECT_TYPE_SERVICE = 'PROJECT_TYPE_SERVICE';

export interface IProjectTypeService {
  getAll(): ProjectType[];
}
