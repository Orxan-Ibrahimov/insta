import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LocaleStorageService } from 'src/app/services/locale-storage.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  constructor(
    private localStorageService: LocaleStorageService
  ) {}

  me: User;
  participans:User[] = [];
  selected_chat:boolean;
  ngOnInit(): void {
    this.localStorageService.me$.subscribe((data) => {
      this.me = data;
      for (let chat_group of this.me.chat_groups) {
        chat_group.users = chat_group.users.filter(u => u.id != this.me.id);
      }
      console.log(this.me);
      
    });
  }
}
