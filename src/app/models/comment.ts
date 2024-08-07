import { CommentLike } from "./comment_like";
import { GIF } from "./gif";
import { Post } from "./postData";
import { User } from "./user";

export interface Comment {
  id: string;
  comment: string;
  image: string;
  user: User;
  post: Post;
  date: Date;
  gif: GIF;
  comments:Comment[];
  comment_likes:CommentLike[];
  replied_to:Comment;
}
