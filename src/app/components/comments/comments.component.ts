import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  messages: Message[];
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
  }
}
