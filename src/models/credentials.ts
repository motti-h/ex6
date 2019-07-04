export enum UserRole {
  Admin = 'admin',
  Contributor = 'contributor',
  Reader = 'reader',
}

export interface Credential {
  email: string;
  password: string;
  roles: UserRole[];
}

export interface UserCredential extends Credential {
  userId: number;
}
