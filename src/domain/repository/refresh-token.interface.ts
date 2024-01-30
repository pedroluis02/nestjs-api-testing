import { RefreshToken } from './../model/refresh-token.model';

export abstract class IRefreshTokenRepository {
  abstract findOne(id: string): Promise<RefreshToken | null>;
  abstract save(model: RefreshToken): Promise<RefreshToken>;
  abstract update(model: Partial<RefreshToken>): Promise<boolean>;
}
