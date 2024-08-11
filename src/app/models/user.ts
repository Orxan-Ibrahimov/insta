import { ChatGroup } from "./chat_group";
import { Citizenship } from "./citizenship";
import { Post } from "./postData";
import { StickerPack } from "./sticker_pack";

export interface User {
  first_name: string;
  last_name: string;
  nickname: string;
  id: string;
  password: string;
  professional:string;
  profile?:string;
  cover?:string;
  status?:string;
  posts?:Post[];
  citizenship?:Citizenship;
  followers?:User[];
  followings?:User[];
  sticker_packs?:StickerPack[];
  chat_groups?: ChatGroup[];
}
