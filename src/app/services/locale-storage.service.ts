import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class LocaleStorageService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  tokenName = 'token';

  getItem() {
    return localStorage.getItem(this.tokenName);
  }

  setItem(token: string) {
    localStorage.setItem(this.tokenName, token);
  }

  me() {
    let token = this.getItem();
    let decodedToken = this.jwtService.decodeToken(token);
    return this.usersService.getUserById(decodedToken.userId);
  }

  removeItem() {
    localStorage.removeItem(this.tokenName);
  }
}
