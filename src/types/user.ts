export interface Roles {
  admin?: boolean;
  employee?: boolean;
}

export interface User {
  uid: string;
  email: string;
  roles: Roles;
}
