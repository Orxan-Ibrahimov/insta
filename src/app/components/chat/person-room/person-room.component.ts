import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatGroup } from 'src/app/models/chat_group';
import { User } from 'src/app/models/user';
import { ChatGroupService } from 'src/app/services/chat_group.service';
import { LocaleStorageService } from 'src/app/services/locale-storage.service';

@Component({
  selector: 'app-person-room',
  templateUrl: './person-room.component.html',
  styleUrls: ['./person-room.component.scss'],
})
export class PersonRoomComponent implements OnInit {
  chat_group: ChatGroup;
  is_my_message:boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private chatGroupService: ChatGroupService
  ) {}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params) => {
      const chat_id = params['friend'];
      this.chatGroupService.get_chat_group_by_id(chat_id).subscribe((cg) => {
        this.chat_group = cg;

        console.log('cg:', this.chat_group);
      });
    });
  }

}
