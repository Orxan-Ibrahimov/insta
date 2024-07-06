import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/postData';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  constructor() {}
  @Input() Post: Post | undefined;
  ngOnInit(): void {
    this.Post?.likes.forEach((like) => {
      // console.log(like);

      if (like?.post?.id === this.Post?.id) this.Post.liked = true;
      else this.Post.liked = false;
    });
    console.log(this.Post.liked);
    
  }

  DoLike() {}
}
