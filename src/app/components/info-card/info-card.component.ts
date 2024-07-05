import { Component, Input, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
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
  user: User;

  showDialog() {
    this.visible = true;
  }

  LogOut() {
    this.authService.logout();
  }
  onModalClosed() {
    this.visible = false;
  }
  ngOnInit(): void {
    let token = this.localeStorageService.getItem();
    let decodedToken = this.jwtService.decodeToken(token);
    this.usersService
      .getUserById(decodedToken.userId)
      .subscribe((db_user: User) => {
        this.user = db_user;
        
      });
  }
}

