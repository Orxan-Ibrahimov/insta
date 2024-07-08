import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { JwtService } from 'src/app/services/jwt.service';
import { LocaleStorageService } from 'src/app/services/locale-storage.service';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private localeStorageService: LocaleStorageService,
    private usersService: UsersService
  ) {}
  visible: boolean = false;
  me: User;

  showDialog() {
    this.visible = true;
  }

  LogOut() {
    this.authService.logout();
  }
  onModalClosed() {
    this.visible = false;
  }

  RefreshedUser(data: User) {
    this.me = data;
  }
  ngOnInit(): void {
    this.localeStorageService.me().subscribe((me) => {
      this.me = me;
    });
  }
}
