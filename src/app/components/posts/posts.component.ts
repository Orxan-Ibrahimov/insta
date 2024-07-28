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
  liked: boolean = false;
  emotions: Emotion[];
  de: Emotion[];
  post_likes: Like[];

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
        // this.post_likes = likes.filter(like => like.post.id === this.Post.id);
        likes.forEach((like) => {
          if (like.post?.id === this.Post?.id && like.who_likes?.id == me?.id) {
            this.like = like;
            this.liked = true;
            this.emotion = like.emotion;
          }
        });
      });
    });
    this.emotion_service.get_emotions().subscribe((emotions) => {
      this.emotions = this.OKB_X(this.Post, emotions);
    });
  }

  OKB_X(post: Post, emotions: Emotion[]) {
    let my_emotions = emotions;
    for (const my_emotion of my_emotions) {
      my_emotion.likes = my_emotion.likes.filter(
        (like) => like.post.id === post.id
      );
    }
    return my_emotions;
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
          this.Post.likes = p.likes;
          this.liked = true;
          this.like = createdLike;
          this.refresh_like_id(this.Post.likes);
          for (const emotion of this.emotions) {
            if (emotion.id === like.emotion.id) emotion.likes.push(createdLike);
          }
        });
      });
    } else if (emotion && this.liked) {
      this.like.emotion = emotion;
      this.likeService
        .change_emotion(this.like.id, this.like)
        .subscribe((changed_like) => {
          this.emotion = changed_like.emotion;
          this.like = changed_like;

          // this.emotion_service.update_current_emotion(changed_like.emotion);
          this.postService.getPostById(this.Post.id).subscribe((p) => {
            this.liked = true;
            this.Post = p;
            this.refresh_like_id(this.Post.likes);
            this.emotion_service.get_emotions().subscribe((emotions) => {
              this.emotions = this.OKB_X(this.Post, emotions);
            });
          });
        });
    } else {
      this.likeService.delete(this.like_id).subscribe((deletedLike) => {
        this.postService.getPostById(this.Post.id).subscribe((p) => {
          this.liked = false;
          this.Post = p;
          this.emotion_service.get_emotions().subscribe((emotions) => {
            this.emotions = this.OKB_X(this.Post, emotions);
          });
        });
      });
    }
  }

  CountLikerEmotionList(Likes: Like[]) {
    let diff_emotions: Emotion[] = [];
    Likes.forEach((like) => {
      let has_emotion = false;
      if (diff_emotions.length === 0) diff_emotions.push(like.emotion);
      else {
        for (let index = 0; index < diff_emotions.length; index++) {
          const emotion = diff_emotions[index];
          if (like.emotion.image === emotion.image) {
            has_emotion = true;
            break;
          }
        }

        if (!has_emotion) {
          diff_emotions.push(like.emotion);
          has_emotion = false;
        }
      }
    });

    return diff_emotions;
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
