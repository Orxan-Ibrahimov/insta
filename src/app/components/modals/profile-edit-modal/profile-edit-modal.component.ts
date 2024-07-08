import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Citizenship } from 'src/app/models/citizenship';
import { User } from 'src/app/models/user';
import { CitizenshipService } from 'src/app/services/citizenship.service';
import { JwtService } from 'src/app/services/jwt.service';
import { LocaleStorageService } from 'src/app/services/locale-storage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile-edit-modal',
  templateUrl: './profile-edit-modal.component.html',
  styleUrls: ['./profile-edit-modal.component.scss'],
})
export class ProfileEditModalComponent implements OnInit {
  constructor(
    private citizenshipsService: CitizenshipService,
    private formBuilder: FormBuilder,
    private jwtService: JwtService,
    private localeStorageService: LocaleStorageService,
    private usersService: UsersService
  ) {}

  @Input('is_visible') visible: boolean = false;
  @Output() not_visible = new EventEmitter<void>();

  my_user: User = {
    first_name: '',
    last_name: '',
    nickname: '',
    id: '',
    password: '',
    citizenship: undefined,
  };
  citizenships: Citizenship[];
  profile: File | null = null;
  cover: File | null = null;
  profile_error: string;
  cover_error: string;

  closeModal(event: Event) {
    this.visible = false;
    this.not_visible.emit();
  }

  onFileChange(event: any, name: string) {
    const fileList: FileList = event.target.files;

    if (name === 'profile') {
      if (fileList.length <= 0) {
        this.profile_error = `${name} is required`;
        return;
      } else if (
        !['image/jpeg', 'image/png', 'image/svg+xml'].includes(fileList[0].type)
      ) {
        this.profile_error = `${name} must be image type`;
        return;
      }
      this.profile_error = null;
      this.profile = fileList[0];
    } else if (name === 'cover') {
      if (fileList.length <= 0) {
        this.cover_error = `${name} is required`;
        return;
      } else if (
        !['image/jpeg', 'image/png', 'image/svg+xml'].includes(fileList[0].type)
      ) {
        this.cover_error = `${name} must be image type`;
        return;
      }
      this.cover_error = null;
      this.cover = fileList[0];
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid || !this.profile_error || !this.cover_error) {
      let postformdata = new FormData();
      postformdata.append('cover', this.cover);
      postformdata.append('profile', this.profile);
      postformdata.append('citizenship', this.my_user.citizenship.id);
      postformdata.append('first_name', this.my_user.first_name);
      postformdata.append('last_name', this.my_user.last_name);
      postformdata.append('nickname', this.my_user.nickname);
      postformdata.append('professional', this.my_user.professional);
      console.log(postformdata.get('profile'));
      // return;
      this.usersService
        .updateUser(postformdata, this.my_user.id)
        .subscribe((updatedUser) => {
          this.visible = false;
          this.not_visible.emit();
        });
    }
  }
  ngOnInit(): void {
    let token = this.localeStorageService.getItem();
    let decodedToken = this.jwtService.decodeToken(token);
    this.usersService
      .getUserById(decodedToken.userId)
      .subscribe((db_user: User) => {
        this.my_user = db_user;
        // this.fname = this.my_user.first_name;
      });

    this.citizenshipsService.get().subscribe((cs: Citizenship[]) => {
      this.citizenships = cs;
    });
  }
}
