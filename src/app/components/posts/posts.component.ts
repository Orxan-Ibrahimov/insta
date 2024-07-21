import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Emotion } from 'src/app/models/emotion';
import { Like } from 'src/app/models/like';
import { Post } from 'src/app/models/postData';
import { User } from 'src/app/models/user';
import { EmotionService } from 'src/app/services/emotion.service';
import { LikeService } from 'src/app/services/like.service';
import { LocaleStorageService } from 'src/app/services/locale-storage.service';
import { PostService } from 'src/app/services/post.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  constructor(
    private likeService: LikeService,
    private postService: PostService,
    private emotion_service: EmotionService,
    private localeStorageService: LocaleStorageService,
    private usersService: UsersService
  ) {}
  @Input() Post: Post | undefined;

  me: User;
  // comment_visible: boolean;
  like_id: string;
  liked: boolean;
  emotions: Emotion[];
  emotion: Emotion;
  default: Emotion;
  like: Like;

  ngOnInit(): void {
    this.emotion_service.current_emotion$.subscribe((data) => {
      this.default = data;
    });
    this.localeStorageService.me$.subscribe((me) => {
      this.me = me;
      this.refresh_like_id(this.Post.likes);
      this.likeService.get().subscribe((likes) => {
        likes.forEach((like) => {
          if (like.post?.id === this.Post?.id && like.who_likes?.id == me?.id) {
            this.like = like;
            this.emotion = like.emotion;
          }
        });
      });
    });
    this.emotion_service.get_emotions().subscribe((emotions) => {
      this.emotions = emotions;
    });
  }

  DoLike(event: MouseEvent, emotion: Emotion | null) {
    event.stopPropagation();

    if (emotion && !this.liked) {
      this.emotion = emotion;

      const like: Like = {
        who_likes: this.me,
        post: this.Post,
        id: '',
        emotion: emotion,
      };

      this.likeService.add_like(like).subscribe((createdLike) => {
        this.postService.getPostById(this.Post.id).subscribe((p) => {
          this.Post = p;
          this.liked = true;
          this.like = createdLike;

          this.refresh_like_id(this.Post.likes);
        });
      });
    } else if (emotion && this.liked) {


      this.like.emotion = emotion;
      this.likeService
        .change_emotion(this.like.id, this.like)
        .subscribe((changed_like) => {
          this.emotion = changed_like.emotion;
          this.like = changed_like;

          this.liked = true;
          this.emotion_service.update_current_emotion(changed_like.emotion);
          this.postService.getPostById(this.Post.id).subscribe((p) => {
            this.Post = p;
            this.refresh_like_id(this.Post.likes);
          });
        });
    } else {
      this.likeService.delete(this.like_id).subscribe((deletedLike) => {
        this.liked = false;
        this.postService.getPostById(this.Post.id).subscribe((p) => {
          this.Post = p;
        });
      });
    }
  }

  OpenComments() {
    this.Post.read_comments = !this.Post.read_comments;
    this.postService.update_current_post(this.Post);
  }

  refresh_like_id(likes: Like[]) {
    likes.forEach((like) => {
      if (like.who_likes.id == this.me?.id) {
        this.liked = true;
        this.like_id = like.id;
        return;
      } else this.liked = false;
    });
  }
}
