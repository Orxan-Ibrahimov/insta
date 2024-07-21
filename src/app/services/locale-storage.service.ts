import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { JwtService } from './jwt.service';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocaleStorageService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {
    this.me().subscribe((me) => {      
      if(me)
      this.me_subject.next(me);
    });
  }

  private me_subject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  me$: Observable<User> = this.me_subject.asObservable();

  updateData(me: User) {
    this.me_subject.next(me);
  }
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
