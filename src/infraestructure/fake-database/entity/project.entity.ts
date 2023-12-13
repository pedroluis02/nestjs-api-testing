import { FDbProjectTypeEntity } from './project-type.entity';
import { FDbUserEntity } from './user.entity';

export interface FDbProjectEntity {
  _id: string;
  id: number;
  type: FDbProjectTypeEntity;
  user: FDbUserEntity;
  name: string;
  title: string;
  description: string;
  createdAt: Date;
}
