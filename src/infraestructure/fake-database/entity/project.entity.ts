import { ProjectTypeEntity } from './project-type.entity';
import { UserEntity } from './user.entity';

export interface ProjectEntity {
  _id: string;
  id: number;
  type: ProjectTypeEntity;
  user: UserEntity;
  name: string;
  title: string;
  description: string;
  createdAt: Date;
}
