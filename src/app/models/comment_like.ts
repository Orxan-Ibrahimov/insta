import { Comment } from "./comment";
import { Emotion } from "./emotion";
import { User } from "./user";

export interface CommentLike {
  id: string;
  who_likes: User;
  comment: Comment;
  emotion?:Emotion;
}
