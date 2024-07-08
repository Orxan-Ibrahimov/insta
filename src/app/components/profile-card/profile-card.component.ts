import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { JwtService } from 'src/app/services/jwt.service';
import { LocaleStorageService } from 'src/app/services/locale-storage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit {
  constructor(
    private localeStorageService: LocaleStorageService,
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  ProfilePage: boolean = true;
  me: User;

  ngOnInit(): void {
    this.localeStorageService.me().subscribe((me) => {
      this.me = me;
    });
  }
}
