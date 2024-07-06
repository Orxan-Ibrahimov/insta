import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  imagePreviewSrc: string | ArrayBuffer | null | undefined = '';
  isImageSelected: boolean = false;
  my_new_post: FormGroup;
  user: User;
  desc;
  postFormData: FormData;
  i_can_not_share: boolean = true;
  @Output() Posts = new EventEmitter<Post[]>();


  onChangeImage(event: any) {
    let selectedFile = (event.target as HTMLInputElement).files?.item(0);

    if (selectedFile) {
      if (
        ['image/jpeg', 'image/png', 'image/svg+xml'].includes(selectedFile.type)
      ) {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(selectedFile);

        fileReader.addEventListener('load', (event) => {
          this.imagePreviewSrc = event.target?.result;
          this.isImageSelected = true;
        });
        this.postFormData = new FormData();
        this.postFormData.append('image', selectedFile);
        this.i_can_not_share = false;
      }
    } else {
      this.isImageSelected = false;
    }
  }

  choseImage(element: any) {
    element.click();
  }

  private _initPostForm() {
    // this.my_new_post = this.formBuilder.group({
    //   // description: ['', Validators.required],
    //   image: [''],
    // });
  }

  SendPost() {
    if (this.desc) {
      if (!this.postFormData) this.postFormData = new FormData();

      this.postFormData.append('user', this.user.id);
      this.postFormData.append(
        'description',
        this.desc
      );
      this.postService.addPost(this.postFormData).subscribe(
        (addedPost) => {
          this.desc = "";
          this.closeImage();
          this.Posts.emit();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  closeImage() {

    this.isImageSelected = false;
    // this.my_new_post.patchValue({image: null});
    this.postFormData.delete('image');
    if (!this.desc) this.i_can_not_share = true;
  }

  ngOnInit(): void {
    let token = this.localeStorageService.getItem();
    let decodedToken = this.jwtService.decodeToken(token);
    this.usersService
      .getUserById(decodedToken.userId)
      .subscribe((db_user: User) => {
        this.user = db_user;
        // this.my_new_post.value.user = this.user.id;
      });

    this._initPostForm();
  }

  get getPostForm() {
    return this.my_new_post?.controls;
  }
}
