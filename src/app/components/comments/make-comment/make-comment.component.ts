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

  isImageSelected: boolean = false;
  selectedFile;
  imagePreviewSrc: any = [];

  ngOnInit(): void {
    this.localeStorageService.me$.subscribe((me) => {
      this.me = me;
      this.ms = new FormData();
      this.ms.append('user', this.me.id);
    });
  }

  onChangeImage(event: any) {
    this.selectedFile = (event.target as HTMLInputElement).files?.item(0);
    if (this.selectedFile) {
      if (
        ['image/jpeg', 'image/png', 'image/svg+xml'].includes(
          this.selectedFile.type
        )
      ) {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(this.selectedFile);

        fileReader.addEventListener('load', (event) => {
          this.imagePreviewSrc.push(event.target?.result);

          this.isImageSelected = true;
        });
        this.ms.append('image', this.selectedFile);
      }
    } else {
      this.isImageSelected = false;
    }
  }

  choseImage(element: any) {
    element.click();
  }

  closeImage() {
    this.isImageSelected = false;
    this.ms.delete('image');
    this.imagePreviewSrc = [];
  }

  SendMessage() {
    this.postService.current_post$.subscribe((post) => {
      this.current_post = post;
    });
    this.ms.append('message', this.message);
    this.ms.append('post', this.current_post.id);
    this.messageService.addMessage(this.ms).subscribe((added_message) => {
      console.log('cp', this.current_post);

      this.messageService
        .getMessageById(added_message.id)
        .subscribe((message) => {
          this.current_post.messages.push(message);
          this.postService.update_current_post(this.current_post);
          this.ms = new FormData();
          this.ms.append('user', this.me.id);
          this.message = '';
          this.closeImage();

        });
    });
  }
}
