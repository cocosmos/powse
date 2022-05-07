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
export interface EventType {
  present: "present" | "home";
  category: "food" | "activity" | "free";
  title: string;
  date: Date | string;
  dateStart: Date | string;
  dateEnd: Date | string;
  unlimited: boolean;
  space: number;
  location: string;
}
