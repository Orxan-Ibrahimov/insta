import { Emotion } from "./emotion";
import { Post } from "./postData";
import { User } from "./user";

export interface Emoji {
  id: string;
  name: string;
  image: string;
  code:string;
  creator:User;
  created_date:Date;
  emoji_category:string;
}
