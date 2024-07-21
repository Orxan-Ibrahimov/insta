import { Citizenship } from "./citizenship";
import { Post } from "./postData";

export interface StickerPack {
  [x: string]: any;
  name: string;
  image: string;
  created_date: Date;
  id: string;
  users: string;
  // stickers?:string;
}
