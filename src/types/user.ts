export interface Roles {
  admin?: boolean;
  employee?: boolean;
}

export interface User {
  email: string;
  name: string;
  timeStamp: Date;
  password: string;
  company: string;
}
