export interface FDbUserEntity {
  _id?: string;
  id?: number;
  name: string;
  email: string;
  username: string;
  password?: string;
  encryptedPasword?: boolean;
}
