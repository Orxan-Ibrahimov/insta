import { Citizenship } from "./citizenship";

export interface User {
  [x: string]: any;
  first_name: string;
  last_name: string;
  nickname: string;
  id: string;
  password: string;
  professional?:string;
  profile?:string;
  cover?:string;
  citizenship:Citizenship
}
