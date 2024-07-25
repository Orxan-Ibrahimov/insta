import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { Post } from 'src/app/models/postData';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  post_comments: Comment[];
  
  constructor(private postService: PostService) {}

  @Input('current_post') post:Post;
  
  ngOnInit(): void {
    this.postService.current_post$.subscribe(cp => {
      this.post_comments = cp.comments;
      console.log('opop',this.post.comments);
      
    });
    
  }
}
