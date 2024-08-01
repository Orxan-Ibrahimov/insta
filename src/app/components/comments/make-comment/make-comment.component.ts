import { Component, Input, OnInit } from '@angular/core';
import { distinctUntilChanged } from 'rxjs';
import { EmojiCategory } from 'src/app/models/emoji_category';
import { GIF } from 'src/app/models/gif';
import { Post } from 'src/app/models/postData';
import { User } from 'src/app/models/user';
import { CommentService } from 'src/app/services/comment.service';
import { EmojiCategoryService } from 'src/app/services/emoji_category.service';
import { LocaleStorageService } from 'src/app/services/locale-storage.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-make-comment',
  templateUrl: './make-comment.component.html',
  styleUrls: ['./make-comment.component.scss'],
})
export class MakeCommentComponent implements OnInit {


  constructor(
    private messageService: CommentService,
    private localeStorageService: LocaleStorageService,
    private postService: PostService,
    private emojiCategoryService: EmojiCategoryService,
  ) {
    
  }

  @Input() comment_id: string;
  message: string;
  gif_image: GIF;
  message_image: any;
  ms: FormData;
  me: User;
  current_post: Post;

  gif_selected: boolean = false;
  sticker_selected: boolean = false;
  emoji_selected: boolean = false;
  selectedFile;
  imagePreviewSrc: any = [];

  ngOnInit(): void {
    this.message = "";
    this.localeStorageService.me$.subscribe((me) => {
      this.me = me;
      this.ms = new FormData();
      this.ms.append('user', this.me.id);
    });
    this.postService.current_post$.subscribe((post) => {
      this.current_post = post;
    });
    this.messageService.image$.subscribe((img) => {
      this.gif_image = img;
      if (this.gif_image) this.gif_selected = false;
    });
    this.emojiCategoryService
      .get_emoji_categories()
      .subscribe((emoji_categories: EmojiCategory[]) => {
        console.log(emoji_categories);
      });
  }

  receiveMessage($event: string): void {
    this.message = $event;
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
          this.message_image = event.target?.result;
        });
        this.ms.append('image', this.selectedFile);
      }
    }
  }

  choseImage(element: any, type: string) {
    if (type === 'image') element.click();
    else if (type === 'gif') this.gif_selected = !this.gif_selected;
    else if (type === 'sticker') this.sticker_selected = !this.sticker_selected;
    else if (type === 'emoji') this.emoji_selected = !this.emoji_selected;
  }

  closeImage() {
    this.ms.delete('image');
    this.message_image = '';
    this.messageService.update_image(null);
    this.ms.delete('gif');
  }

  WriteMessage(){
    console.log(this.message);
    
    // this.messageService.message$.pipe(
    //   distinctUntilChanged()
    // ).subscribe(message => {
    //   this.message = message;
    //   this.messageService.update_message(message);      
    // })
  }
  SendMessage() {
    if (this.message) this.ms.append('comment', this.message);
    if (this.gif_image) this.ms.append('gif', this.gif_image.id);
    this.ms.append('post', this.current_post.id);
    if (this.comment_id) this.ms.append('replied_to', this.comment_id);

    this.messageService.addComment(this.ms).subscribe((added_message) => {
      this.postService.getPostById(this.current_post.id).subscribe((post) => {
        console.log(post);

        this.current_post.comments = post.comments;
        // this.postService.update_current_post(post);
        this.ms = new FormData();
        this.ms.append('user', this.me.id);
        this.message = '';
        this.closeImage();
      });
    });
  }
}
