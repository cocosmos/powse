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
  present: "general" | "home";
  category: "food" | "activity" | "free" | string;
  title: string;
  date: Date | string;
  dateStart: Date | string;
  dateEnd: Date | string;
  unlimited: boolean;
  space: number | undefined;
  location: string;
}
