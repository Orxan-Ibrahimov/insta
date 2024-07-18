import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { JwtService } from 'src/app/services/jwt.service';
import { LocaleStorageService } from 'src/app/services/locale-storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private actived_route: ActivatedRoute,
    private jwtService: JwtService,
    private localeStorageService: LocaleStorageService,
    private usersService: UsersService
  ) {}
  visible: boolean = false;
  // me: User;

  spec_user;
  is_me: boolean;

  showDialog() {
    this.visible = true;
  }

  LogOut() {
    this.authService.logout();
  }
  onModalClosed() {
    this.visible = false;
  }

  // RefreshedUser(data: User) {
  //   this.spec_user = data;
  // }
  ngOnInit(): void {
    this.localeStorageService.me$.subscribe((me) => {
      this.actived_route.params.subscribe((params) => {
        this.usersService.getUserById(params['pid']).subscribe((user) => {
          this.spec_user = user;
          console.log('me', me);
          console.log('user', user);
          
          if (me === user) this.is_me = true;
          else this.is_me = false;
        });
      });
    });
  }
}
