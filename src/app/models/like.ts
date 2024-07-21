import { Emotion } from "./emotion";
import { Post } from "./postData";
import { User } from "./user";

export interface Like {
  id: string;
  who_likes: User;
  post: Post;
  emotion?:Emotion;
}
