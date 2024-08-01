import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { distinctUntilChanged } from 'rxjs';
import { EmojiCategory } from 'src/app/models/emoji_category';
import { User } from 'src/app/models/user';
import { CommentService } from 'src/app/services/comment.service';
import { EmojiCategoryService } from 'src/app/services/emoji_category.service';
import { LocaleStorageService } from 'src/app/services/locale-storage.service';

@Component({
  selector: 'app-emojis',
  templateUrl: './emojis.component.html',
  styleUrls: ['./emojis.component.scss'],
})
export class EmojisComponent implements OnInit {
  me: User;
  emoji_categories: EmojiCategory[];
  @Input() comment_message: string;
  @Output() messageEvent = new EventEmitter<string>();

  // selected_emoji_category: EmojiCategory;

  constructor(
    private localeStorageService: LocaleStorageService,
    private emoji_category_service: EmojiCategoryService,
    private comment_service: CommentService
  ) {}

  ngOnInit(): void {
    this.localeStorageService.me$.subscribe((me) => {
      this.me = me;
    });
    this.emoji_category_service
      .get_emoji_categories()
      .subscribe((ec: EmojiCategory[]) => {
        this.emoji_categories = ec;
      });
  }

  ChooseEmoji(code: string) {
    this.comment_message += code;
    this.messageEvent.emit(this.comment_message);

  }

  chooseCategory(data: string) {
    if (data) {
      const element = document.getElementById(data);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
