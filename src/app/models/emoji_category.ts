import { Emoji } from "./emoji";
import { Emotion } from "./emotion";
import { Post } from "./postData";
import { User } from "./user";

export interface EmojiCategory {
  id: string;
  name: string;
  icon_code: string;
  creator:User;
  created_date:Date;
  emojis:Emoji[];
}
