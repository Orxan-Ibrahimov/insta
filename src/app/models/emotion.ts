import { Like } from "./like";

export interface Emotion {
  id: string;
  name: string;
  image: string;
  action: string;
  created_date: Date;
  likes:Like[]
}
