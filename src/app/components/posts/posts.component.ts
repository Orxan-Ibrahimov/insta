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
  de: Emotion[];
  likes: Like[][];

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

        console.log(this.Post.likes);
      });
    });
    this.emotion_service.get_emotions().subscribe((emotions) => {
      this.emotions = emotions;
      this.likes = this.OKB(this.Post.likes);

      // console.log('tr:',this.OKB(this.Post.likes));
    });
  }

  OKB(likes: Like[]) {
    let new_likes: any[] = [];

    for (let index = 0; index < this.emotions.length; index++) {
      const emotion = this.emotions[index];
      let new_sub_likes: any[] = [];
      for (let index = 0; index < likes.length; index++) {
        const like = likes[index];
        if (like.emotion.image === emotion.image) new_sub_likes.push(like);
      }
      new_likes.push(new_sub_likes);
    }

    console.log(new_likes);

    return new_likes;
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
          this.likes = this.OKB(this.Post.likes);

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

          this.emotion_service.update_current_emotion(changed_like.emotion);
          this.postService.getPostById(this.Post.id).subscribe((p) => {
            this.liked = true;
            this.Post = p;
            this.refresh_like_id(this.Post.likes);
            this.likes = this.OKB(this.Post.likes);
          });
        });
    } else {
      this.likeService.delete(this.like_id).subscribe((deletedLike) => {
        this.postService.getPostById(this.Post.id).subscribe((p) => {
          this.liked = false;

          this.Post = p;
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
