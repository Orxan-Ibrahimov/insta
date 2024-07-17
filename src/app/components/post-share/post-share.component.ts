import { isNull } from '@angular/compiler/src/output/output_ast';
import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/postData';
import { User } from 'src/app/models/user';
import { JwtService } from 'src/app/services/jwt.service';
import { LocaleStorageService } from 'src/app/services/locale-storage.service';
import { PostService } from 'src/app/services/post.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-post-share',
  templateUrl: './post-share.component.html',
  styleUrls: ['./post-share.component.scss'],
})
export class PostShareComponent implements OnInit {
  constructor(
    // private formBuilder: FormBuilder,
    private router: Router,
    private jwtService: JwtService,
    private localeStorageService: LocaleStorageService,
    private usersService: UsersService,
    private postService: PostService
  ) {}
  videoPreviewSrc: string | ArrayBuffer | null;
  imagePreviewSrc: any = [];
  isImageSelected: boolean = false;
  isVideoSelected: boolean = false;
  me: User;
  desc;
  postFormData: FormData;
  i_can_not_share: boolean = true;
  selectedFile;

  @Input() share_close: boolean;
  @Output() share_close_export = new EventEmitter<void>();

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
        // this.postFormData = new FormData();
        this.postFormData.append('images', this.selectedFile);
        this.i_can_not_share = false;
      }
    } else {
      this.isImageSelected = false;
    }
  }

  onChangeVideo(event: any) {
    this.selectedFile = (event.target as HTMLInputElement).files?.item(0);

    if (this.selectedFile) {
      if (['video/mp4', 'video/ogg'].includes(this.selectedFile.type)) {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(this.selectedFile);

        fileReader.addEventListener('load', (event) => {
          this.videoPreviewSrc = event.target?.result;
          this.isVideoSelected = true;
        });
        this.postFormData.append('video', this.selectedFile);
        this.i_can_not_share = false;
      }
    } else {
      this.isVideoSelected = false;
    }
  }

  choseImage(element: any) {
    element.click();
  }
  choseVideo(element: any) {
    element.click();
  }

  SendPost() {
    if (this.desc) {
      if (!this.postFormData) this.postFormData = new FormData();

      this.postFormData.append('user', this.me.id);
      this.postFormData.append('description', this.desc);
      this.postService.addPost(this.postFormData).subscribe(
        (addedPost) => {
          this.desc = '';
          this.closeImage();
          this.closeVideo();
          this.postService.getPosts().subscribe((posts) => {
            this.postService.updateData(posts);
            this.localeStorageService.me().subscribe((me) => {
              this.localeStorageService.updateData(me);
            });
          });

          this.share_close = false;
          this.share_close_export.emit();
          this.postFormData = new FormData();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  closeImage() {
    this.isImageSelected = false;
    this.postFormData.delete('images');
    this.imagePreviewSrc = [];
    if (!this.desc) this.i_can_not_share = true;
  }

  closeVideo() {
    this.isVideoSelected = false;
    this.postFormData.delete('video');
    this.videoPreviewSrc = null;
    if (!this.desc) this.i_can_not_share = true;
  }

  ngOnInit(): void {
    this.localeStorageService.me$.subscribe((me) => {
      this.postFormData = new FormData();
      this.me = me;
    });
  }
}
