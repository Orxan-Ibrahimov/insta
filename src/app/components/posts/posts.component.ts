import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/postData';
import { LikeService } from 'src/app/services/like.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  constructor(private likeService: LikeService) {}
  @Input() Post: Post | undefined;
  like_id: string;
  ngOnInit(): void {
    // console.log(this.Post);

    this.Post.likes.forEach((like) => {
      if (like.post.id === this.Post.id) {
        this.Post.liked = true;
        this.like_id = like.id;
      } else this.Post.liked = false;
    });
  }

  DoLike() {
    if (this.Post.liked) {
      this.likeService.delete(this.like_id).subscribe((deletedLike) => {
        this.Post.liked = false;
      });
    } else {
      let likeForm = new FormData();
      likeForm.append('post', this.Post.id);
      likeForm.append('who_likes', this.Post.user.id);
      console.log(likeForm.get('post'));
      console.log(likeForm.get('who_likes'));

      this.likeService.add_like(likeForm);
      this.Post.liked = true;
    }
  }
}
