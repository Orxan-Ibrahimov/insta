import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Like } from 'src/app/models/like';
import { Post } from 'src/app/models/postData';
import { LikeService } from 'src/app/services/like.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  constructor(
    private likeService: LikeService,
    private postService: PostService
  ) {}
  @Input() Post: Post | undefined;

  like_id: string;
  liked: boolean;

  ngOnInit(): void {
    this.refresh_like_id(this.Post.likes);
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
        who_likes: this.Post.user,
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

  refresh_like_id(likes: Like[]) {
    likes.forEach((like) => {
      if (like.post.id === this.Post.id) {
        this.liked = true;
        this.like_id = like.id;
      } else this.liked = false;
    });
  }
}
