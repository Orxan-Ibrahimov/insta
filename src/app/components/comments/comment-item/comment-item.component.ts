import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {
  @Input() post_message:Message;

  constructor() { }

  ngOnInit(): void {
    // console.log('x:',this.post_message);
    
  }

}
