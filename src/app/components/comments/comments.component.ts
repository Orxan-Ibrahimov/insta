import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';
import { Post } from 'src/app/models/postData';
import { MessageService } from 'src/app/services/message.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  post_messages: Message[];
  
  constructor(private messageService: MessageService, private postService: PostService) {}

  @Input('current_post') post:Post;
  
  ngOnInit(): void {
    this.postService.current_post$.subscribe(cp => {
      this.post_messages = cp.messages;
      console.log(cp.messages);
      
    });
    
  }
}
