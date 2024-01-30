import { FDbUserEntity } from './user.entity';

export interface FDbRefreshTokenEntity {
  _id?: string;
  id?: number;
  isActive: boolean;
  user?: FDbUserEntity;
}
