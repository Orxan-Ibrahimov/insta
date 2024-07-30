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
  liked: boolean = false;
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
      this.likeService.get().subscribe((likes) => {
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
      console.log("add like");
      
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

          console.log('asas:', this.Post.likes);

          for (const emotion of this.emotions) {
            if (emotion.id === like.emotion.id) emotion.likes.push(createdLike);
          }
        });
      });
    } else if (emotion && this.liked) {
      console.log('change emoji');
      console.log('like', this.like);

      this.like.emotion = emotion;
      this.likeService
        .change_emotion(this.like.id, this.like)
        .subscribe((changed_like) => {
          this.emotion = changed_like.emotion;
          this.like = changed_like;
          this.postService.getPostById(this.Post.id).subscribe((p) => {
            this.Post.likes = p.likes;
            this.emotion_service.get_emotions().subscribe((emotions) => {
              this.emotions = this.OKB_X(p, emotions);
            });
          });
        });
    } else {
      console.log('delete like');
      let like_id = this.Post.likes.find(
        (like) => like.who_likes.id === this.me.id
      ).id;

      this.likeService.delete(like_id).subscribe((deletedLike) => {
        this.postService.getPostById(this.Post.id).subscribe((p) => {
          this.liked = false;
          this.Post.likes = p.likes;
          this.emotion_service.get_emotions().subscribe((emotions) => {
            this.emotions = this.OKB_X(this.Post, emotions);
          });
        });
      });
    }
  }

  OpenComments() {
    this.Post.read_comments = !this.Post.read_comments;
    this.postService.update_current_post(this.Post);
  }
}
