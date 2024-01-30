import { User } from './user.model';

export interface RefreshTokenPayload {
  jti: string;
  sub: string;
}

export interface RefreshToken {
  id: string;
  isRevoked: boolean;
  userId: string;
}
