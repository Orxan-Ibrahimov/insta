import { Post } from "./postData";
import { User } from "./user";

export interface Message {
  id: string;
  message: string;
  image: string;
  user: User;
  post: Post;
  date: Date;
}
