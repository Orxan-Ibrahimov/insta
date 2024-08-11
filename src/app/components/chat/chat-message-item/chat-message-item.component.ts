import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage } from 'src/app/models/chat_message';
import { User } from 'src/app/models/user';
import { LocaleStorageService } from 'src/app/services/locale-storage.service';

@Component({
  selector: 'app-chat-message-item',
  templateUrl: './chat-message-item.component.html',
  styleUrls: ['./chat-message-item.component.scss'],
})
export class ChatMessageItemComponent implements OnInit {
  me: User;
  is_emoji: boolean = false;

  constructor(private localStorageService: LocaleStorageService) {}

  @Input() message: ChatMessage;
  ngOnInit(): void {
    this.localStorageService.me$.subscribe((data) => {
      this.me = data;
      this.is_emoji = !this.isNotEmoji(this.message.message);
      console.log(this.message.emotion);
      
    });
  }

  isNotEmoji(text: string): boolean {
    // Regular expression to match one or more emojis
    // const emojiRegex =
    //   /^([\u231A-\u231B\u23E9-\u23EC\u25B6-\u25C0\u2600-\u26FF\u2700-\u27BF\u2B05-\u2B55\u2934-\u2935\u2B50-\u2B50\u3297-\u3299\u303D-\u303D\u3030-\u3030\u2B06-\u2B07\u2B1B-\u2B1C\u2B1D-\u2B1D\u2B50-\u2B50\u2B55-\u2B55\u303D-\u303D\u3297-\u3299\u1F004-\u1F004\u1F0CF-\u1F0CF\u1F170-\u1F171\u1F17E-\u1F17F\u1F18E-\u1F18E\u1F191-\u1F19A\u1F1E6-\u1F1FF\u1F201-\u1F202\u1F21A-\u1F21A\u1F22F-\u1F22F\u1F232-\u1F23A\u1F250-\u1F251\u1F300-\u1F320\u1F32D-\u1F335\u1F337-\u1F37C\u1F37E-\u1F393\u1F3A0-\u1F3CA\u1F3CF-\u1F3D3\u1F3E0-\u1F3F0\u1F3F3-\u1F3F4\u1F3F8-\u1F3FA\u1F400-\u1F43E\u1F440-\u1F440\u1F442-\u1F4FC\u1F4FF-\u1F4FF\u1F525-\u1F53D\u1F54B-\u1F54E\u1F550-\u1F567\u1F57A-\u1F57A\u1F595-\u1F596\u1F5A4-\u1F5A4\u1F5FB-\u1F5FF\u1F600-\u1F64F\u1F680-\u1F6C5\u1F6CC-\u1F6CC\u1F6D0-\u1F6D2\u1F6EB-\u1F6EC\u1F6F4-\u1F6F9\u1F910-\u1F93E\u1F940-\u1F945\u1F947-\u1F9FF\u1FA70-\u1FA73\u1FA78-\u1FA7A\u1FA80-\u1FA82\u1FA90-\u1FAB2\u1FAC0-\u1FAC2\u1FAD0-\u1FAD6\u1F680-\u1F6FC\u1F7E0-\u1F7EB\u1F90C-\u1F93A\u1F9B0-\u1F9B9\u1F9C0-\u1F9C2\u1F9D0-\u1F9D9\u1F9DC-\u1F9FF])+$/g;
    const emojiRegex = /([\u231A-\u231B\u23E9-\u23EC\u25B6-\u25C0\u2600-\u26FF\u2700-\u27BF\u2B05-\u2B55\u2934-\u2935\u2B50-\u2B50\u3297-\u3299\u303D-\u303D\u3030-\u3030\u2B06-\u2B07\u2B1B-\u2B1C\u2B1D-\u2B1D\u2B50-\u2B50\u2B55-\u2B55\u303D-\u303D\u3297-\u3299\u1F004-\u1F004\u1F0CF-\u1F0CF\u1F170-\u1F171\u1F17E-\u1F17F\u1F18E-\u1F18E\u1F191-\u1F19A\u1F1E6-\u1F1FF\u1F201-\u1F202\u1F21A-\u1F21A\u1F22F-\u1F22F\u1F232-\u1F23A\u1F250-\u1F251\u1F300-\u1F320\u1F32D-\u1F335\u1F337-\u1F37C\u1F37E-\u1F393\u1F3A0-\u1F3CA\u1F3CF-\u1F3D3\u1F3E0-\u1F3F0\u1F3F3-\u1F3F4\u1F3F8-\u1F3FA\u1F400-\u1F43E\u1F440-\u1F440\u1F442-\u1F4FC\u1F4FF-\u1F4FF\u1F525-\u1F53D\u1F54B-\u1F54E\u1F550-\u1F567\u1F57A-\u1F57A\u1F595-\u1F596\u1F5A4-\u1F5A4\u1F5FB-\u1F5FF\u1F600-\u1F64F\u1F680-\u1F6C5\u1F6CC-\u1F6CC\u1F6D0-\u1F6D2\u1F6EB-\u1F6EC\u1F6F4-\u1F6F9\u1F910-\u1F93E\u1F940-\u1F945\u1F947-\u1F9FF\u1FA70-\u1FA73\u1FA78-\u1FA7A\u1FA80-\u1FA82\u1FA90-\u1FAB2\u1FAC0-\u1FAC2\u1FAD0-\u1FAD6\u1F680-\u1F6FC\u1F7E0-\u1F7EB\u1F90C-\u1F93A\u1F9B0-\u1F9B9\u1F9C0-\u1F9C2\u1F9D0-\u1F9D9\u1F9DC-\u1F9FF])/;

    return emojiRegex.test(text.trim());
  }
}
