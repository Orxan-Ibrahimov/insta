import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { JwtService } from 'src/app/services/jwt.service';
import { LocaleStorageService } from 'src/app/services/locale-storage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  constructor(
   
  ) {}

  isProfile: boolean = true;
  ngOnInit(): void {
   
  }
}
