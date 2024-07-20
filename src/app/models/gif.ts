import { Post } from "./postData";
import { User } from "./user";

export interface GIF {
  id: string;
  url: string;
  search: string;
  creator:User;
  created_date:Date;
}
