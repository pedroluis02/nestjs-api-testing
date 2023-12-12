import { ProjectType } from './project-type.model';
import { User } from './user.model';

export interface Project {
  id: string;
  type: ProjectType;
  user: User;
  name: string;
  title: string;
  description: string;
  createdAt: Date;
}
