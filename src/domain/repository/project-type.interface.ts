import { ProjectType } from './../model/project-type.model';

export const PROJECT_TYPE_REPOSITORY = 'PROJECT_TYPE_REPOSITORY';

export interface IProjectTypeRepository {
  findAlll(): ProjectType[];
}
