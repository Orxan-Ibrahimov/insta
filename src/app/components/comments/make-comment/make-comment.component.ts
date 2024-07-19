import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/postData';
import { User } from 'src/app/models/user';
import { LocaleStorageService } from 'src/app/services/locale-storage.service';
import { MessageService } from 'src/app/services/message.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-make-comment',
  templateUrl: './make-comment.component.html',
  styleUrls: ['./make-comment.component.scss'],
})
export class MakeCommentComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private localeStorageService: LocaleStorageService,
    private postService: PostService
  ) {}

  message: string;
  ms: FormData;
  me: User;
  current_post: Post;
  ngOnInit(): void {
    this.localeStorageService.me$.subscribe((me) => {
      this.me = me;
      this.ms = new FormData();
      this.ms.append('user', this.me.id);
    });
  }

  SendMessage() {
    this.postService.current_post$.subscribe((post) => {
      this.current_post = post;
    });
    this.ms.append('message', this.message);
    this.ms.append('post', this.current_post.id);
    this.messageService.addMessage(this.ms).subscribe(
      (added_message) => {
        console.log('cp',this.current_post);
        
        this.messageService.getMessageById(added_message.id).subscribe(message => {
          this.current_post.messages.push(message);
          this.postService.update_current_post(this.current_post);
          this.ms = new FormData();
          this.ms.append('user', this.me.id);
          this.message = '';
        });
       
      }
    );
  }
}
