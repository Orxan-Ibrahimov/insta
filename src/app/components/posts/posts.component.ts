import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Like } from 'src/app/models/like';
import { Post } from 'src/app/models/postData';
import { User } from 'src/app/models/user';
import { JwtService } from 'src/app/services/jwt.service';
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
    private jwtService: JwtService,
    private localeStorageService: LocaleStorageService,
    private usersService: UsersService
  ) {}
  @Input() Post: Post | undefined;

  me: User;
  comment_visible: boolean;
  like_id: string;
  liked: boolean;

  ngOnInit(): void {
    this.localeStorageService.me$.subscribe((me) => {
      this.me = me;
      this.refresh_like_id(this.Post.likes);
    });
  }

  DoLike() {
    if (this.liked) {
      this.likeService.delete(this.like_id).subscribe((deletedLike) => {
        this.liked = false;
        this.postService.getPostById(this.Post.id).subscribe((p) => {
          this.Post = p;
        });
      });
    } else {
      const like: Like = {
        who_likes: this.me,
        post: this.Post,
        id: '',
      };

      this.likeService.add_like(like).subscribe((createdLike) => {
        this.liked = true;
        this.postService.getPostById(this.Post.id).subscribe((p) => {
          this.Post = p;
          this.refresh_like_id(this.Post.likes);
        });
      });
    }
  }

  OpenComments() {
    this.comment_visible = !this.comment_visible;
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
