import { Component, Input, OnInit } from '@angular/core';
import { ChatGroup } from 'src/app/models/chat_group';

@Component({
  selector: 'app-chat-group-item',
  templateUrl: './chat-group-item.component.html',
  styleUrls: ['./chat-group-item.component.scss']
})
export class ChatGroupItemComponent implements OnInit {

  constructor() { }

  @Input() chat: ChatGroup;
  
  ngOnInit(): void {
  }

}
